import Image from '@theme/IdealImage';

# Ultrasonic to Servo
This activity teaches you to wire the ultrasonic distance sensor. It also helps you visualize (and audio-ize) the noisyness of the signal by translating the distance to a servo angle. You can see and hear how the ultrasonic is not a consistent measurement tool. We will talk through how to deal with this signal-to-noise problem that is at the heart of all measurement problems in robotics.

## Introduction

### Materials
- Ultrasonic
- Servo
- Arduino
- 7 x jumper cables
- [TinkerCAD circuit design and code](https://www.tinkercad.com/things/ayUZBFyDtMV-ultrasonic-to-servo-angle?sharecode=2TfBqd5CHQNFBq9rlRzYZJA-COYJ-Qv4O9A1_8n5iKI)

---
## Activity
Following the circuit and code from the [TinkerCAD circuit design](https://www.tinkercad.com/things/ayUZBFyDtMV-ultrasonic-to-servo-angle?sharecode=2TfBqd5CHQNFBq9rlRzYZJA-COYJ-Qv4O9A1_8n5iKI), you'll build and visualize the distance sensing from a ultrasonic distance sensor.

### Build the ultrasonic circuit
Start with simply building the ultrasonic circuit. After the setup code, the `loop` will send ultrasonic pulses out into the world:

```cpp
digitalWrite(trigPin, LOW);  // start low to ensure no pulse is sent
delayMicroseconds(5);        // ensure 5 microseconds of no signal to avoid interference
digitalWrite(trigPin, HIGH); // start pulse high
delayMicroseconds(10);       // continue for 10 microseconds
digitalWrite(trigPin, LOW);  // stop pulse
```

Then, we wait for the pulse to return and measure how long it took.

```cpp
duration = pulseIn(echoPin, HIGH);
```

You can print this directly to the console. But it's probably worth converting from time duration to distance for human readability:

```cpp
// Convert the time into a distance
cm = (duration/2) / 29.1;     // Divide by 29.1 or multiply by 0.0343
inches = (duration/2) / 74;   // Divide by 74 or multiply by 0.0135
```

Then print to the Serial Monitor console:

```cpp
Serial.print(cm);
Serial.print("cm");
Serial.println();
```

Ensure that you're getting at least sensible readings from the ultrasonic before continuing. Use a piece of paper, a laptop, or your hand to change the distance reading. What are the minimum and maximum readings you can get before it seems to not make sense anymore?


### Build the servo circuit
Now that the ultrasonic is working, we can build the servo circuit. This should be relatively easy, given our practice with it last time. The only conceptually difficult part is the `map`, although the line of code is simple:

```cpp
pos = map(cm, minDist, maxDist, 0, 180);  
myservo.write(pos); // tell servo to go to position in variable 'pos'
```

Ensure that you've calibrated `minDist` and `maxDist` to the range you expect your ultrasonic to work in.

### Design a filter for the signal
You probably have noticed that the servo is jumping around a little bit. Even without moving the object that you're sensing the distance to, the distance reading is changing. This is called "noise," and we have to create a filter to get the true signal from the noise.

There are many approaches to creating filters. Come up with a few approaches that you could use to "smooth out" the signal. Discuss them with your group, and then try implementing them in code.


---
## On your own
Signal processing is the foundation of many important techniques that we use in robotics, machine learning, and many other fields. Understanding the representation of a signal as a time series, and the kinds of operations you can do to get the important information out of it will help you in many jobs.

Look around the internet for different types of filters, and try implementing them on your robot. For example, you may look up high-pass and low-pass audio filters. You might look at running averages, median filters, and other statistical filters. You might also consider looking up image convolutions (which we will talk about later in the course).

---
## Philosophical Connection
What is signal and what is noise? We almost have to assume some kind of [platonic ideal](https://en.wikipedia.org/wiki/Theory_of_forms) that exists if we don't just take the noise as signal. That is, how do we know that the signal we're trying to extract is the "true" signal, or just some manipulation we've imposed on the system? Similarly, what are we sensing with the distance sensor? Are we truly sensing distance, or is that just an interpretation of the "real" thing we're sensing, i.e., time for a signal to bounce? From that perspective, the signal may be "correct" and the "noise" is actually an accurate representation of signal bouce time. What's the "true" picture?