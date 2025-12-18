---
description: Bluetooth Low Energy beacon messages
draft: true
---

import Image from '@theme/IdealImage';

# BLE Swarms

## Introduction
Bluetooth Low Energy (BLE) beacons are a broadcast technology that allow for the frequent transmission of small amounts of data. We can hide messages on a BLE beacon signal using a hex encoding. The advantage of using BLE is that any device can scan for the messages without connecting, since the message is hidden in the information about the beacon itself.

### Materials
- Arduino
- BLE scanner (like NRF Connect)

---
## Activity
### Upload BLE code to Arduino
Upload the following code to your Arduino. You may need to install the `ArduinoBLE` library to run it. Once the code is uploaded, use the Serial Monitor to hide short hexidecimal messages inside the beacon identification signal. Change the name of your Arduino under `BLE.setLocalName("R4 Beacon");` if you want a unique name.

```cpp
#include <ArduinoBLE.h>

// Fixed Company ID (will appear as FF FF at the start of Manufacturer Data)
static const uint16_t COMPANY_ID = 0xFFFF;

// Legacy ADV = 31 bytes total. Manufacturer AD item uses:
// 2 bytes (AD len+type) + 2 bytes CI + N data
// Keep N <= 27 to be safe.
static const size_t MAX_DATA_AFTER_CI = 27;   // for normal mode
static const size_t MAX_MFG_TOTAL     = 29;   // for RAW (CI+data)

// --- very small hex parser: accepts spaces/commas/colons and optional 0x prefixes ---
int hexToBytes(const char* s, uint8_t* out, size_t maxOut) {
  size_t n = 0;
  int half = -1; // -1 = none, otherwise holds high nybble (0..15)
  auto hexVal = [](char c)->int {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return 10 + (c - 'a');
    if (c >= 'A' && c <= 'F') return 10 + (c - 'A');
    return -1;
  };
  for (size_t i = 0; s[i]; ++i) {
    char c = s[i];
    if (c==' ' || c=='\t' || c==',' || c==':') continue;
    if (c=='0' && (s[i+1]=='x' || s[i+1]=='X')) { i++; continue; }
    int v = hexVal(c);
    if (v < 0) return -1;
    if (half < 0) half = v;
    else {
      if (n >= maxOut) return -1;
      out[n++] = (uint8_t)((half << 4) | v);
      half = -1;
    }
  }
  if (half >= 0) return -1; // odd number of nybbles
  return (int)n;
}

void setMfg(const uint8_t* bytes, size_t len) {
  BLE.stopAdvertise();
  BLE.setManufacturerData(bytes, len);
  BLE.advertise();
}

void setup() {
  Serial.begin(115200);
  while (!Serial) {}

  if (!BLE.begin()) { Serial.println("BLE init failed"); while (1); }

  // Optional: try to be nonconnectable (ignored if not supported)
  BLE.setConnectable(false);
  BLE.setLocalName("R4 Beacon");

  // Start with CI only
  uint8_t init[2] = { (uint8_t)(COMPANY_ID & 0xFF), (uint8_t)(COMPANY_ID >> 8) };
  setMfg(init, 2);

  Serial.println("Type hex bytes to append after CI=0xFFFF (e.g., 01 02 41 42 43)");
  Serial.println("Or: RAW <hex> to set full field including CI (little-endian).");
  Serial.println("Limits: normal <= 27 bytes data, RAW total <= 29 bytes (CI+data).");
}

void loop() {
  BLE.poll();

  static char buf[256];
  static size_t idx = 0;

  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\r') continue;
    if (c == '\n') {
      buf[idx] = '\0';
      idx = 0;

      // Skip leading spaces
      char* s = buf;
      while (*s==' ' || *s=='\t') s++;
      if (*s == '\0') { Serial.println("OK (empty)"); continue; }

      if (strncasecmp(s, "RAW", 3) == 0) {
        s += 3; // parse after RAW
        uint8_t bytes[64];
        int n = hexToBytes(s, bytes, sizeof(bytes));
        if (n < 0) { Serial.println("ERR: bad hex"); continue; }
        if (n < 2) { Serial.println("ERR: RAW needs >= 2 bytes (CI)"); continue; }
        if (n > (int)MAX_MFG_TOTAL) { Serial.println("ERR: RAW too long (>29)"); continue; }
        setMfg(bytes, (size_t)n);
        Serial.print("OK RAW, len="); Serial.println(n);

      } else {
        // Normal mode: prepend default CI
        uint8_t data[64];
        int dn = hexToBytes(s, data, sizeof(data));
        if (dn < 0) { Serial.println("ERR: bad hex"); continue; }
        if (dn > (int)MAX_DATA_AFTER_CI) { Serial.println("ERR: too long (>27)"); continue; }

        uint8_t out[2 + MAX_DATA_AFTER_CI];
        out[0] = (uint8_t)(COMPANY_ID & 0xFF);   // little-endian CI
        out[1] = (uint8_t)(COMPANY_ID >> 8);
        memcpy(out + 2, data, dn);
        setMfg(out, 2 + dn);

        Serial.print("OK default CI, data len=");
        Serial.println(dn);
      }

    } else if (idx + 1 < sizeof(buf)) {
      buf[idx++] = c;
    }
  }
}

```

### Scan and read the data
Using a scanner like NRF Connect, look for a device called "R4 Beacon" (or whatever you changed it to). There should be an option to view the raw data. Look for a string of hex corresponding to whatever you typed into the Serial Monitor. Try something obvious and repetitive if it's hard to tell whether your message is being sent.

---
## On your own
Play around with the Arduino Bluetooth library examples. The Arduino can act like any other Bluetooth peripheral, just like a Bluetooth keyboard or mouse. Try sending messages to your phone, or controlling your computer.

---
## Philosophical Connection
The Internet of Things (IoT) revolution is underway: BLE is enabling a wide range of emerging technology, such as indoor positioning, tracking packages in warehouses, and much more. Often, there is an assumption that more smart technology is always better. However, a big difference between a computer system and a human system is the amount of explicit rule-based design. A computer system always needs rules, but a human system very well may not. Using a systems perspective to analyze the question, what kinds of human systems cannot be translated into rule-based computer IoT systems?