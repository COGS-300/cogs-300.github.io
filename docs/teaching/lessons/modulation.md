---
draft: true
---

# Modulation 
There are a number of different ways that we use the physics of signals to encode information. Two common ones that you may have heard of are [amplitude modulation](https://en.wikipedia.org/wiki/Amplitude_modulation) and [frequency modulation](https://en.wikipedia.org/wiki/Frequency_modulation) which are used for [AM/FM radio](https://en.wikipedia.org/wiki/Radio). 

Amplitude modulation means that the output signal is controlled by the "height" or "loudness" of the wave. Here's a Processing.org sketch that demonstrates AM:

:::tip
You'll need the [Minim library](https://code.compartmental.net/minim/) to hear the demos.
:::

```java
import ddf.minim.*;

Minim minim;
AudioOutput out;

float carrierFreq = 440;  // Hz
float time = 0;
float noiseTime = 0;      // Time input to Perlin noise
float noiseSpeed = 0.5;   // Speed of noise change

void setup() {
  size(800, 400);
  frameRate(60);
  
  minim = new Minim(this);
  out = minim.getLineOut(Minim.MONO, 2048);
  
  out.addSignal(new AMNoiseSignal(carrierFreq, out.sampleRate()));
}

void draw() {
  background(255);
  fill(0);
  text("Amplitude Modulation with Non-Periodic Perlin Noise", 10, 20);
  
  stroke(255, 0, 0);
  for (int i = 0; i < out.bufferSize() - 1; i++) {
    float x1 = map(i, 0, out.bufferSize(), 0, width);
    float x2 = map(i + 1, 0, out.bufferSize(), 0, width);
    float y1 = height/2 + out.left.get(i) * 100;
    float y2 = height/2 + out.left.get(i+1) * 100;
    line(x1, y1, x2, y2);
  }
}

void stop() {
  out.close();
  minim.stop();
  super.stop();
}

// =====================
// AM Signal Generator
// =====================
class AMNoiseSignal implements AudioSignal {
  float carrierFreq, sampleRate;
  float t = 0;
  float mod = 0;
  
  AMNoiseSignal(float cFreq, float sRate) {
    carrierFreq = cFreq;
    sampleRate = sRate;
  }
  
    void generate(float[] samples) {
    for (int i = 0; i < samples.length; i++) {
      // Update modulator via bounded random walk
      float mod = map(mouseY, 0, height, 1.0, 0.0);
      
      float carrier = sin(TWO_PI * carrierFreq * t);
      samples[i] = mod * carrier;  // Ensure total output is in [-1,1]
      
      t += 1.0 / sampleRate;
    }
  }
  

  void generate(float[] left, float[] right) {
    generate(left);
    for (int i = 0; i < right.length; i++) {
      right[i] = left[i];
    }
  }
}
```

Frequency modulation means that the signal is controlled by the wavelength or "pitch" of the signal. Here's a Processing.org sketch that demonstrates FM:

```java
import ddf.minim.*;

Minim minim;
AudioOutput out;

float baseFreq = 300;       // Base frequency of carrier
float modIndex = 200;       // Maximum frequency deviation

void setup() {
  size(800, 400);
  frameRate(60);
  
  minim = new Minim(this);
  out = minim.getLineOut(Minim.MONO, 2048);
  
  out.addSignal(new FMPerlinSignal(baseFreq, modIndex, out.sampleRate()));
}

void draw() {
  background(255);
  fill(0);
  text("FM Signal with Perlin Noise Modulator (Red)", 10, 20);

  stroke(255, 0, 0);
  for (int i = 0; i < out.bufferSize() - 1; i++) {
    float x1 = map(i, 0, out.bufferSize(), 0, width);
    float x2 = map(i + 1, 0, out.bufferSize(), 0, width);
    float y1 = height / 2 + out.left.get(i) * 100;
    float y2 = height / 2 + out.left.get(i + 1) * 100;
    line(x1, y1, x2, y2);
  }
}

void stop() {
  out.close();
  minim.stop();
  super.stop();
}

// ============================
// FM Signal Generator
// ============================

class FMPerlinSignal implements AudioSignal {
  float baseFreq, modIndex, sampleRate;
  float t = 0;
  
  FMPerlinSignal(float freq, float index, float sRate) {
    baseFreq = freq;
    modIndex = index;
    sampleRate = sRate;
  }

  void generate(float[] samples) {
    for (int i = 0; i < samples.length; i++) {
      float mod = map(mouseY, 0, height, 1.0, 0.0);
      float freq = baseFreq + mod * modIndex;
      
      samples[i] = sin(TWO_PI * freq * t);
      
      t += 1.0 / sampleRate;
    }
  }

  void generate(float[] left, float[] right) {
    generate(left);
    for (int i = 0; i < right.length; i++) {
      right[i] = left[i];
    }
  }
}
```

Pulse width modulation instead uses the amount of time that a signal is `ON` or `HIGH` to encode information. 

```java
import ddf.minim.*;

Minim minim;
AudioOutput out;

float carrierFreq = 250;
float modRate = 0.25;
float sampleRate;
float[] lastDutyValues;

void setup() {
  size(800, 400);
  frameRate(60);
  
  minim = new Minim(this);
  out = minim.getLineOut(Minim.MONO, 2048);
  sampleRate = out.sampleRate();

  lastDutyValues = new float[out.bufferSize()];
  out.addSignal(new PWMSignal(carrierFreq, modRate, sampleRate, lastDutyValues));
}

void draw() {
  background(255);
  fill(0);
  text("PWM Audio Signal with Perlin Noise Duty Cycle", 10, 20);

  stroke(0, 0, 255);  // PWM waveform
  for (int i = 0; i < out.bufferSize() - 1; i++) {
    float x1 = map(i, 0, out.bufferSize(), 0, width);
    float x2 = map(i+1, 0, out.bufferSize(), 0, width);
    float y1 = height/2 + out.left.get(i) * 100;
    float y2 = height/2 + out.left.get(i+1) * 100;
    line(x1, y1, x2, y2);
  }

  stroke(255, 0, 0);  // Modulator signal (duty cycle)
  for (int i = 0; i < out.bufferSize() - 1; i++) {
    float x1 = map(i, 0, out.bufferSize(), 0, width);
    float x2 = map(i + 1, 0, out.bufferSize(), 0, width);
    float y1 = height - lastDutyValues[i] * height;
    float y2 = height - lastDutyValues[i+1] * height;
    line(x1, y1, x2, y2);
  }
}

void stop() {
  out.close();
  minim.stop();
  super.stop();
}

// ===============================================
// PWM AUDIO SIGNAL
// ===============================================

class PWMSignal implements AudioSignal {
  float carrierFreq, modRate, sampleRate;
  float t = 0;
  float cycleTime;
  float noiseT = 0;
  
  float[] dutyRecord;

  PWMSignal(float freq, float modR, float sRate, float[] dutyBuffer) {
    carrierFreq = freq;
    modRate = modR;
    sampleRate = sRate;
    cycleTime = 1.0 / carrierFreq;
    dutyRecord = dutyBuffer;
  }

  void generate(float[] samples) {
    for (int i = 0; i < samples.length; i++) {
      float duty = map(mouseY, 0, height, 0.05, 0.95);
      
      float phase = (t % cycleTime) / cycleTime;
      samples[i] = (phase < duty) ? 0.8 : -0.8;
      
      t += 1.0 / sampleRate;
      noiseT += modRate / sampleRate;

      dutyRecord[i] = duty;
    }
  }

  void generate(float[] left, float[] right) {
    generate(left);
    arrayCopy(left, right);
  }
}
```
The reason why PWM makes more sense for Arduino is that we're using direct wire connections with well-defined `HIGH` (`+5V`) and `LOW` (`GND`) voltage states. In theory, we could do some form of AM or FM using the Arduino, and it would be a fun exercise to try, but it's simply faster with the existing Arduino hardware setup to use `HIGH`/`LOW` patterns.

Comparing PWM to neuron signaling is interesting, particularly if we look at [neuron signaling patterns](https://pmc.ncbi.nlm.nih.gov/articles/PMC5067378/). Each time the motor neuron fires, the muscle contracts ever-so-slightly in what is called a *twitch*. Put enough twitches together, and you get perceptible movement. That is a bit like a duty cycle: more signal on equals more output of the actuator.

