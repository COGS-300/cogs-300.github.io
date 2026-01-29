# TinkerCAD
Start by building and testing the circuit here: [Ultrasonic Basics](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics/editel?returnTo=%2Fthings%2F0ZcVbvEtyh1-ultrasonic-basics%3Fsharecode%3DEYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg).

# Upload the following to your Arduino
```cpp
int trigPin = 10;
int echoPin = 11;

long duration, cm, inches;

volatile int n = 1;          // 1..100
long history[100] = {0};

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(1);      // IMPORTANT: don't block waiting for digits
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

long average(long s) {
  // shift right (keep newest at [0])
  for (int i = 99; i >= 1; i--) {
    history[i] = history[i - 1];
  }
  history[0] = s;

  long sum = 0;
  for (int i = 0; i < n; i++) sum += history[i];
  return sum / n;
}

void loop() {
  // --- RECEIVE n (non-blocking) ---
  if (Serial.available() > 0) {
    int newN = Serial.parseInt();      // reads quickly due to timeout=1ms
    if (newN >= 1 && newN <= 100) n = newN;

    // flush rest of line (newline etc.)
    while (Serial.available() > 0) Serial.read();
  }

  // --- MEASURE ---
    // The sensor is triggered by a HIGH pulse of 10 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  duration = pulseIn(echoPin, HIGH);

  long avg = average(duration);

  cm = (avg / 2.0) / 29.1;
  inches = (avg / 2.0) / 74.0;

  // --- SEND ---
  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm, n=");
  Serial.println(n);

  delay(20); // ~50 Hz stream; remove/adjust as you like
}


```

# Upload the following to Processing 

```java
import processing.serial.*;

Serial port;

int historyLen = 600;
float[] y = new float[historyLen];
int n = 0;

float lastCm = 0;
float pad = 5;

// --- slider layout ---
int sliderX = 70;
int sliderW = 380;
int sliderH = 40;          // reserved area height at bottom
int sliderY;               // computed from height
int knobX = sliderX;
boolean dragging = false;

int value = 1;             // 1–100
int lastSent = -1;

void setup() {
  size(900, 450);
  println(Serial.list());

  int portIndex = 3; // <-- CHANGE THIS
  port = new Serial(this, Serial.list()[portIndex], 9600);
  port.bufferUntil('\n');

  sliderY = height - 20;   // slider line y
  knobX = sliderX;         // start at value=1
}

void draw() {
  background(255);

  // --- graph area (leave space for slider) ---
  int left = 50, top = 30, right = width - 30, bottom = height - sliderH - 20;
  int gw = right - left, gh = bottom - top;

  // axes
  stroke(0);
  noFill();
  rect(left, top, gw, gh);

  fill(0);
  text("Distance (cm)", 10, 20);
  text("Time →", width/2, height - 5);
  text(nf(lastCm, 0, 1) + " cm", left + 10, top - 5);

  // --- slider ---
  drawSlider();

  // no data yet
  if (n == 0) {
    fill(0);
    text("Waiting for data...", left + 10, top + 20);
    return;
  }

  // autoscale from data
  float ymin = y[0], ymax = y[0];
  for (int i = 1; i < n; i++) {
    if (y[i] < ymin) ymin = y[i];
    if (y[i] > ymax) ymax = y[i];
  }
  if (abs(ymax - ymin) < 0.001) { ymax += 1; ymin -= 1; }
  ymin -= pad; ymax += pad;

  // Y ticks
  stroke(220);
  fill(0);
  textAlign(RIGHT, CENTER);
  for (int i = 0; i <= 4; i++) {
    float v = lerp(ymin, ymax, i/4.0);
    float yy = map(v, ymin, ymax, bottom, top);
    line(left, yy, right, yy);
    text(nf(v, 0, 1), left - 5, yy);
  }
  textAlign(LEFT, BASELINE);

  // plot
  stroke(0);
  noFill();
  beginShape();
  for (int i = 0; i < n; i++) {
    float x = map(i, 0, historyLen - 1, left, right);
    float yy = map(y[i], ymin, ymax, bottom, top);
    vertex(x, yy);
  }
  endShape();
}

void drawSlider() {
  int lineY = height - 20;

  stroke(0);
  line(sliderX, lineY, sliderX + sliderW, lineY);

  // knob
  fill(0);
  ellipse(knobX, lineY, 14, 14);

  // map knob to value (1..100)
  value = int(map(knobX, sliderX, sliderX + sliderW, 1, 100));
  value = constrain(value, 1, 100);

  fill(0);
  text("n = " + value + " (send on release)", sliderX, lineY - 12);
}

void serialEvent(Serial p) {
  String line = p.readStringUntil('\n');
  if (line == null) return;
  line = trim(line);
  if (line.length() == 0) return;

  try {
    // Find "... <number>cm ..." anywhere in the line
    int cmPos = line.indexOf("cm");
    if (cmPos < 0) return;

    // Walk backwards from 'c' to find start of the number
    int end = cmPos;          // index of 'c' in "cm"
    int start = end - 1;
    while (start >= 0) {
      char ch = line.charAt(start);
      if ((ch >= '0' && ch <= '9') || ch == '.' || ch == '-' ) start--;
      else break;
    }
    start += 1;

    if (start >= end) return;

    float cm = float(line.substring(start, end));
    lastCm = cm;

    if (n < historyLen) {
      y[n++] = cm;
    } else {
      arrayCopy(y, 1, y, 0, historyLen - 1);
      y[historyLen - 1] = cm;
    }
  } catch (Exception e) {
    // ignore malformed lines
  }
}

void mousePressed() {
  int lineY = height - 20;
  if (dist(mouseX, mouseY, knobX, lineY) < 10) dragging = true;
}

void mouseDragged() {
  if (dragging) knobX = constrain(mouseX, sliderX, sliderX + sliderW);
}

void mouseReleased() {
  if (!dragging) return;
  dragging = false;

  // send once, and only if changed
  if (value != lastSent) {
    port.write(value + "\n");
    lastSent = value;
    println("Sent n=" + value);
  }
}
```