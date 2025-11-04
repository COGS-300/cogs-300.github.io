Upload the following to your Arduino:

```cpp
// UNO R4 WiFi classroom demo (ArduinoBLE)
// - Alternates SCAN ↔ ADVERTISE
// - Accepts messages ONLY from devices whose name starts with "COGS 300"
// - Advertised payload: [2 bytes msgUID (BE)] + ASCII word (truncated)
// - De-dup by msgUID for DUP_MS
// - CSV log to Serial + "NEW MESSAGE" line on first receipt

#include <ArduinoBLE.h>

// ---- timings (ms)
// Base length for each phase
const uint32_t BASE_MS = 1000;      // 1 second base
const uint32_t JITTER_MS = 500;     // +/- up to 0.5 sec
uint32_t currentScanMS = BASE_MS;
uint32_t currentAdvMS  = BASE_MS;

// ---- payload
const size_t MAX_PAYLOAD = 22; // 2B UID + up to 20 ASCII chars

// ---- de-dup
const uint32_t DUP_MS = 10000;
const size_t   RECENTS = 128;

// ---- identity
const char* NAME_PREFIX = "COGS 300";
const char* BASE_NAME   = "COGS 300-";
char shortUIDStr[5];   // "XXXX"
uint16_t deviceUID = 0;

// ---- mode state
enum Mode { MODE_SCAN, MODE_ADV };
Mode mode = MODE_SCAN;
uint32_t modeStart = 0;

// ---- outbound message (to advertise)
uint16_t msgCounter = 0;
uint8_t  advPayload[MAX_PAYLOAD];
size_t   advLen = 0;
bool     haveMessageToAdvertise = false;

// ---- recent uid buffer
struct Recent { uint16_t uid; uint32_t ts; };
Recent recentBuf[RECENTS];
size_t recentIdx = 0;

void addRecent(uint16_t uid) {
  recentBuf[recentIdx].uid = uid;
  recentBuf[recentIdx].ts  = millis();
  recentIdx = (recentIdx + 1) % RECENTS;
}
bool seenRecently(uint16_t uid) {
  uint32_t now = millis();
  for (size_t i = 0; i < RECENTS; ++i) {
    if (recentBuf[i].uid == uid && (now - recentBuf[i].ts) < DUP_MS) return true;
  }
  return false;
}

void formatShortUid(uint16_t uid) {
  snprintf(shortUIDStr, sizeof(shortUIDStr), "%04X", uid & 0xFFFF);
}

uint32_t randomCycleTime() {
  return BASE_MS + (int32_t)random(-((long)JITTER_MS), ((long)JITTER_MS));
}

// Pseudo-unique 16-bit device UID (MAC not exposed in this core)
uint16_t deriveDeviceUID() {
  uint32_t mix = (uint32_t)millis() ^ (uint32_t)micros();
  uint16_t u = (uint16_t)((mix ^ (mix >> 16)) & 0xFFFF);
  if (u == 0) u = 0x1A2B; // avoid 0
  return u;
}

void queueMessage(const String &word) {
  String w = word; w.trim();
  if (!w.length()) return;

  msgCounter++;
  uint16_t mUID = msgCounter & 0xFFFF;

  advPayload[0] = (uint8_t)((mUID >> 8) & 0xFF);
  advPayload[1] = (uint8_t)(mUID & 0xFF);

  size_t maxText = MAX_PAYLOAD - 2;
  size_t copyLen = (w.length() > maxText) ? maxText : w.length();
  for (size_t i = 0; i < copyLen; ++i) advPayload[2 + i] = (uint8_t)w[i];
  advLen = 2 + copyLen;
  haveMessageToAdvertise = true;

  // CSV trace for the queue event
  Serial.print("QUEUED,");
  Serial.print(mUID);
  Serial.print(",");
  Serial.println(w);
}

void startScan() {
  BLE.stopAdvertise();
  BLE.scan(true);

  currentScanMS = randomCycleTime();    // NEW
  mode = MODE_SCAN;
  modeStart = millis();

  Serial.print("MODE,SCAN for ");
  Serial.print(currentScanMS);
  Serial.println(" ms");
}

void startAdvertise() {
  BLE.stopScan();

  // Device name "COGS 300-XXXX"
  String devName = String(BASE_NAME) + shortUIDStr;
  BLE.setLocalName(devName.c_str());

  if (haveMessageToAdvertise && advLen > 0) {
    BLE.setManufacturerData(advPayload, advLen);

    // ---- PRINT what we're advertising ----
    Serial.print("ADV CYCLE: Broadcasting message UID ");
    uint16_t uid = ((uint16_t)advPayload[0] << 8) | advPayload[1];
    Serial.print(uid);
    Serial.print(" : ");

    // print ASCII text portion
    for (size_t i = 2; i < advLen; i++) {
      char ch = (char)advPayload[i];
      if (ch >= 32 && ch <= 126) Serial.print(ch);
    }
    Serial.println();
    // ---------------------------------------
  } else {
    uint8_t d = 0;
    BLE.setManufacturerData(&d, 1);
    Serial.println("ADV CYCLE: (no message queued)");
  }

  BLE.setConnectable(false);
  BLE.advertise();

  currentAdvMS = randomCycleTime();
  mode = MODE_ADV;
  modeStart = millis();

  Serial.print("MODE,ADVERTISE for ");
  Serial.print(currentAdvMS);
  Serial.println(" ms");

}

void logReceived(uint16_t uid, const String &fromName, const String &text, int rssi) {
  uint32_t t = millis();
  // CSV: time_ms,msgUID,fromName,rssi,text
  char buf[256];
  snprintf(buf, sizeof(buf), "%lu,%u,%s,%d,%s",
           (unsigned long)t, uid, fromName.c_str(), rssi, text.c_str());
  Serial.println(buf); // CSV line

  // Human-readable banner for classroom
  Serial.print("NEW MESSAGE from ");
  Serial.print(fromName);
  Serial.print(" (UID=");
  Serial.print(uid);
  Serial.print(", RSSI=");
  Serial.print(rssi);
  Serial.print("): ");
  Serial.println(text);
}

// prefix check without relying on String::startsWith (for compatibility)
bool hasNamePrefix(const String& name, const char* prefix) {
  size_t plen = strlen(prefix);
  if (name.length() < plen) return false;
  for (size_t i = 0; i < plen; ++i) {
    if (name[i] != prefix[i]) return false;
  }
  return true;
}

void setup() {
  randomSeed(analogRead(A0));  // pseudo-random seed

  Serial.begin(115200);
  while (!Serial) {}

  // init de-dup buffer
  for (size_t i = 0; i < RECENTS; ++i) { recentBuf[i].uid = 0; recentBuf[i].ts = 0; }

  deviceUID = deriveDeviceUID();
  formatShortUid(deviceUID);

  Serial.print("Device name: ");
  Serial.println(String(BASE_NAME) + shortUIDStr);

  if (!BLE.begin()) {
    Serial.println("BLE init failed");
    while (1);
  }

  startScan();
  Serial.println("Ready. Type a single word and press Enter to advertise it.");
  Serial.println("Press 's' to force scan, 'a' to force advertise.");
}

void loop() {
  // --- serial input: whole line -> first token only
  static String line = "";
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\r') continue;
    if (c == '\n') {
      if (line.length() > 0) {
        int sp = line.indexOf(' ');
        String token = (sp == -1) ? line : line.substring(0, sp);
        queueMessage(token);
      }
      line = "";
    } else {
      line += c;
    }
  }

  // quick overrides (single char)
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 's') startScan();
    if (c == 'a') startAdvertise();
  }

  if (mode == MODE_SCAN) {
    BLEDevice dev = BLE.available();
    if (dev) {
      // filter: only accept from devices whose localName starts with "COGS 300"
      String name = dev.localName();
      if (name.length() == 0 || !hasNamePrefix(name, NAME_PREFIX)) {
        // ignore
      } else {
        // Read manufacturer data with buffer API
        uint8_t mfd[31];
        int n = dev.manufacturerData(mfd, sizeof(mfd)); // returns copied length
        if (n >= 2) {
          uint16_t uid = ((uint16_t)mfd[0] << 8) | (uint16_t)mfd[1];
          if (!seenRecently(uid)) {
            // Extract printable ASCII text
            String txt = "";
            for (int i = 2; i < n; ++i) {
              char ch = (char)mfd[i];
              if (ch >= 32 && ch <= 126) txt += ch;
              else break;
            }
            logReceived(uid, name, txt, dev.rssi());
            addRecent(uid);
          }
        }
      }
    }

    if (millis() - modeStart >= currentScanMS) startAdvertise();
  } else { // MODE_ADV
    if (millis() - modeStart >= currentAdvMS) startScan();
  }
}
```