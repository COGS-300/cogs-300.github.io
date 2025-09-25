---
description: Ultrasonic Sensors and Filters
draft: false
---

import Image from '@theme/IdealImage';

# Ultrasonic Sensors and Filters

## Introduction
In this activity, we will see how ultrasonic sensors can be visualized with Processing, and learn about different filters that can be applied to improve the signal.

### Materials
- Ultrasonic sensor
- Arduino
- Jumper cables
- Processing sketch (below)

---
## Activity
### Run the following Processing Visualization
Run the following Processing visualization. The sketch expects that the Arduino will output values over Serial in the from of `"Xin, Ycm" at 9600 baud` as demonstrated in this [Arduino sketch and TinkerCAD circuit](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics?sharecode=EYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg).

```java

// HC-SR04 Visualizer
// Expects Arduino lines: "Xin, Ycm" at 9600 baud

import processing.serial.*;
Serial port;

float cm = 0, inches = 0;
float lastCm = 0, easedCm = 0;
float maxCm = 200;  // tune for your typical HC-SR04 max

// Histories
ArrayList<Float> rawHistory = new ArrayList<Float>();   // raw cm
ArrayList<Float> plotHistory = new ArrayList<Float>();  // filtered/used for plot
int histLen = 300;

// Filters
boolean useMedian = false;
boolean useAverage = false;
int medWin = 5;
int avgWin = 5;
int minWin = 1, maxWin = 100;

// UI
ToggleButton btnMedian, btnAverage;
Slider sldMedian, sldAverage;

// check the available ports for your device
int port_index = 2;

void setup() {
  size(980, 560);
  
  println("Available ports:"); printArray(Serial.list());
  port = new Serial(this, Serial.list()[port_index], 9600);
  port.bufferUntil('\n');
  textFont(createFont("Helvetica", 14));
  smooth(8);

  // UI layout
  float panelX = width * 0.55, panelY = 12, panelW = width * 0.40;
  btnMedian  = new ToggleButton(panelX, panelY,              120, 28, "Median filter");
  btnAverage = new ToggleButton(panelX + 130, panelY,        140, 28, "Average filter");
  sldMedian  = new Slider(panelX, panelY + 40,               panelW, 16, minWin, maxWin, medWin, "Median window");
  sldAverage = new Slider(panelX, panelY + 70,               panelW, 16, minWin, maxWin, avgWin, "Average window");
}

void serialEvent(Serial p) {
  String line = p.readStringUntil('\n');
  if (line == null) return;
  line = trim(line);
  try {
    // Expected: "Xin, Ycm"
    String[] parts = split(line, ',');
    if (parts.length >= 2) {
      String inStr = trim(parts[0]).replace("in", "");
      String cmStr = trim(parts[1]).replace("cm", "");
      inches = float(inStr);
      cm = float(cmStr);
      lastCm = cm;

      // store raw
      rawHistory.add(cm);
      if (rawHistory.size() > max(histLen, maxWin)) rawHistory.remove(0);

      // compute filtered value for plotting
      float val = cm;
      if (useAverage) val = movingAverage(rawHistory, avgWin);
      if (useMedian)  val = movingMedian(rawHistory, medWin);

      plotHistory.add(val);
      if (plotHistory.size() > histLen) plotHistory.remove(0);
    }
  } catch (Exception e) {
    // ignore malformed lines
  }
}

void draw() {
  background(18);
  easedCm += (currentDisplayValue() - easedCm) * 0.15;

  drawHeader();
  drawGauge();
  drawHistory();

  // UI
  btnMedian.draw();
  btnAverage.draw();
  sldMedian.draw();
  sldAverage.draw();

  // Keep slider->win sizes in sync (rounded)
  medWin = sldMedian.getInt();
  avgWin = sldAverage.getInt();
}

float currentDisplayValue() {
  if (plotHistory.size() > 0) return plotHistory.get(plotHistory.size() - 1);
  return lastCm;
}

void drawHeader() {
  fill(255);
  textAlign(LEFT, TOP);
  text("HC-SR04 Visualizer", 16, 12);
  text(nfc(easedCm, 1) + " cm  (" + nfc(inches, 1) + " in)", 16, 36);
  text("Port: " + Serial.list()[port_index], 16, 58);
  String f = (useMedian ? "Median(" + medWin + ")" : "") + (useMedian && useAverage ? " → " : "") + (useAverage ? "Average(" + avgWin + ")" : "");
  text("Filter: " + (f.equals("") ? "None" : f), 16, 80);
}

void drawGauge() {
  pushMatrix();
  translate(width * 0.28, height * 0.64);

  float D = min(width, height) * 0.58;
  float R = D * 0.5;

  noFill();
  stroke(60); strokeWeight(16);
  arc(0, 0, D, D, PI, TWO_PI);

  stroke(80); strokeWeight(2);
  for (int i = 1; i <= 4; i++) {
    float rr = map(i, 1, 4, R * 0.45, R * 0.9);
    arc(0, 0, rr * 2, rr * 2, PI, TWO_PI);
  }

  float clamped = constrain(easedCm, 0, maxCm);
  float t = map(clamped, 0, maxCm, 1, 0);
  float ang = PI + t * PI;

  stroke(255); strokeWeight(4);
  line(0, 0, (R * 0.9) * cos(ang), (R * 0.9) * sin(ang));

  noStroke(); fill(0, 200, 255);
  float rr2 = map(clamped, 0, maxCm, R * 0.1, R * 0.9);
  ellipse(rr2 * cos(ang), rr2 * sin(ang), 10, 10);

  fill(200);
  textAlign(CENTER, CENTER);
  text("Near",  R * 0.9 * cos(TWO_PI - 0.001), R * 0.9 * sin(TWO_PI - 0.001) - 16);
  text("Far",   R * 0.9 * cos(PI),             R * 0.9 * sin(PI) - 16);

  popMatrix();
}

void drawHistory() {
  pushMatrix();
  translate(width * 0.55, 120);
  float w = width * 0.40;
  float h = height * 0.78 - 120;

  noFill(); stroke(80); rect(0, 0, w, h);

  // Grid
  stroke(50);
  for (int i = 1; i < 5; i++) {
    float y = h * i / 5.0; line(0, y, w, y);
  }

  // Plot filtered/selected values
  noFill(); stroke(255); strokeWeight(2);
  beginShape();
  for (int i = 0; i < plotHistory.size(); i++) {
    float x = map(i, 0, histLen - 1, 0, w);
    float y = map(plotHistory.get(i), 0, maxCm, h, 0);
    vertex(x, y);
  }
  endShape();

  // Labels
  fill(255); noStroke();
  textAlign(LEFT, BOTTOM); text("History (" + histLen + " samples)", 6, -8);
  textAlign(RIGHT, TOP);   text(nfc(maxCm, 0) + " cm", w - 4, 6);
  textAlign(RIGHT, BOTTOM); text("0", w - 4, h - 6);
  popMatrix();
}

// ===== Filters =====
float movingAverage(ArrayList<Float> src, int win) {
  int n = min(win, src.size()); if (n == 0) return lastCm;
  float sum = 0;
  for (int i = src.size() - n; i < src.size(); i++) sum += src.get(i);
  return sum / n;
}

float movingMedian(ArrayList<Float> src, int win) {
  int n = min(win, src.size()); if (n == 0) return lastCm;
  float[] buf = new float[n];
  int idx = 0;
  for (int i = src.size() - n; i < src.size(); i++) buf[idx++] = src.get(i);
  // simple in-place sort
  for (int i = 0; i < n - 1; i++) {
    int minI = i;
    for (int j = i + 1; j < n; j++) if (buf[j] < buf[minI]) minI = j;
    float tmp = buf[i]; buf[i] = buf[minI]; buf[minI] = tmp;
  }
  if (n % 2 == 1) return buf[n/2];
  return 0.5 * (buf[n/2 - 1] + buf[n/2]);
}

// ===== UI =====
void mousePressed() {
  if (btnMedian.hit(mouseX, mouseY)) {
    btnMedian.toggle();
    useMedian = btnMedian.on;
  }
  if (btnAverage.hit(mouseX, mouseY)) {
    btnAverage.toggle();
    useAverage = btnAverage.on;
  }
  sldMedian.mousePressed(mouseX, mouseY);
  sldAverage.mousePressed(mouseX, mouseY);
}
void mouseDragged() {
  sldMedian.mouseDragged(mouseX, mouseY);
  sldAverage.mouseDragged(mouseX, mouseY);
}
void mouseReleased() {
  sldMedian.mouseReleased();
  sldAverage.mouseReleased();
}

class ToggleButton {
  float x, y, w, h;
  String label;
  boolean on = false;
  ToggleButton(float x, float y, float w, float h, String label) {
    this.x=x; this.y=y; this.w=w; this.h=h; this.label=label;
  }
  void draw() {
    stroke(60);
    if (on) { fill(40, 160, 80); } else { fill(45); }
    rect(x, y, w, h, 6);
    fill(255); noStroke();
    textAlign(CENTER, CENTER);
    text(label + (on ? " (ON)" : " (OFF)"), x + w/2, y + h/2);
  }
  boolean hit(float mx, float my) { return mx>=x && mx<=x+w && my>=y && my<=y+h; }
  void toggle() { on = !on; }
}

class Slider {
  float x, y, w, h;
  int minV, maxV;
  float val; // float for dragging; exposed as int
  String label;
  boolean dragging = false;

  Slider(float x, float y, float w, float h, int minV, int maxV, int startV, String label) {
    this.x=x; this.y=y; this.w=w; this.h=h;
    this.minV=minV; this.maxV=maxV; this.val=startV;
    this.label=label;
  }
  void draw() {
    // track
    stroke(60); fill(40); rect(x, y, w, h, 6);
    // knob
    float t = (val - minV) / (float)(maxV - minV);
    float kx = x + constrain(t, 0, 1) * w;
    stroke(200); fill(220); rectMode(CENTER);
    rect(kx, y + h/2, 12, h + 6, 4);
    rectMode(CORNER);

    // text
    fill(255); noStroke();
    textAlign(LEFT, BOTTOM);
    text(label + ": " + int(val), x, y - 4);
  }
  void mousePressed(float mx, float my) {
    if (mx>=x && mx<=x+w && my>=y && my<=y+h) {
      dragging = true; update(mx);
    }
  }
  void mouseDragged(float mx, float my) {
    if (dragging) update(mx);
  }
  void mouseReleased() { dragging = false; }
  void update(float mx) {
    float t = constrain((mx - x)/w, 0, 1);
    val = minV + t * (maxV - minV);
  }
  int getInt() { return max(minV, min(maxV, round(val))); }
}
```

### Press Enter to see the Filters
If you press `Enter` or `Return` (or set `boolean useMedian = true;` and/or `boolean useAverage = true;`), you should see boxes show up that let you control average and median filters. Play with the controls to see what the filters do to the incoming signal.

### Understanding the Average Filter
The average filter is likely easiest to understand. Turn off the median filter and set the average filter to a low value. Move your ultrasonic sensor around. You can see that the signal is highly responsive (it reacts quickly) and very noisy (lots of bumps). 

Now set the signal to a high value and move your ultrasonic around. You can see that the signal is less responsive (it reacts slowly) and is not very noisy (only a few bumps).

You can tune the length of the window for the average filter to the results you want.

Algorithmically, we can think of the average filter working to smooth a signal. For an immediate ultrasonic distance measurement, we could write (in pseudocode):

```cpp
signal = get_measurement_now() = m
```

But if we want an average, we would need at least two values:

```cpp
signal = (m[now] + m[last]) * (1/2)
```

Let's use `t` for time to denote `now`, and `t - 1` to denote `last`:

```cpp
signal = (m[t] + m[t-1]) * (1/2)
```

Now if we want to average more parts of the signal, we just need to sum up more items from `m`:


```cpp
signal = (m[t] + m[t-1] + m[t-2] + ... + m[t-n+1]) * (1/n)
```

If our window size is `n`, then to avoid an off-by-one error, we need to have our last item be `t-n+1`. 

Another way to write this in pseudocode would be using slice notation (like in Python):

```cpp
signal = average(m[n:t])
```

### Understanding any Statistical Filter
The same logic as above applies for any filter, including the median fiilter. The median just means the "middle" number of an ordered dataset. So, it would be like:

```cpp
signal = median(m[n:t]) = sort(m[n:t])[n/2] // get the middle of a sorted array
```

You could apply any filter, and sometimes different statistical filters work better.

You could also apply any function to filter the signal, such as a threshold filter:

```cpp
signal = 1 if m > threshold else 0
```

Or, stack them:

```cpp
signal = 1 if average(m[n:t]) > threshold else 0
```

This is a useful technique for making decisions such as whether to turn left or right.

---
## On your own
There are many filters that you can use beyond statistical filters that we saw here today. Go to your favourite audio editing program (or just look this up online) and you can see high-pass and low-pass filters and how they work for audio. You have no doubt heard high- and low-pass filters being used in popular music. Play with it on your own.

---
## Philosophical Connection
The use of filters once again poses ontological and epistemic questions. What is "real" may not be immediately detectable by an unfiltered measurement tool. But that feels wrong to some degree! Shouldn't the measurement tool be the purveyor of objective, physical truth? 

Well, no, not especially. The measurement tool might be biased. Or have errors. So, we apply filters to bring it towards the "truth" of the measurement we need. But, now, doesn't that introduce a subjective bias?

How do you resolve these questions?