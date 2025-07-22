---
title: Lab 01. Interfacing with Arduino
---

For this lab, you will be required to find your lab, introduce yourself to your TA, familiarize yourself with the lab components and Arduino accessories, and read through any Arduino documentation that you find. You will also be required to test the multimeter and familiarize yourself with the lab equipment. You should have already obtained the required electronic course materials.

Each lab has preparatory work that you should do ahead of time. There will usually be some video content, some coding content, and some conceptual content. The pre-labs are not marked, but they are highly suggested to complete to have a good experience in your lab.

---
## Pre-lab

### 1. Download and Install the Arduino IDE
Download the [Arduino IDE](https://www.arduino.cc/en/software) and make sure that it works for your operating system. Make sure that you are using the desktop verison.

### 2. Review the getting started tutorial
Review the [Getting Started Tutorial](https://docs.arduino.cc/learn/starting-guide/getting-started-arduino/). It's OK if you don't understand everything here, since we'll be going through a lot of the concepts in lecture. There is a [setup video](https://docs.arduino.cc/learn/) available, although it may not match your exact Arduino board.

You can also follow along with [Paul McWhorter's Arduino Tutorials](https://www.youtube.com/watch?v=S66Iwhk2V7A&list=PLGs0VKk2DiYyn0wN335MXpbi3PRJTMmex). [Lesson 01](https://youtu.be/S66Iwhk2V7A), [Lesson 02](https://youtu.be/S1NJJRpWHpA) and [Lesson 03](https://youtu.be/0SENIWPdPhQ) are most relevant to this lab, however, you can watch up to [Lesson 09](https://youtu.be/4N-Q28lTzqE) if you would like. Remember, these are not _required_, but provided for your benefit.

### 3. Test the LED matrix
You don't need any circuit-building experience to test the Arduino's built-in LED matrix. Go to the [LED Matrix Tutorial](https://docs.arduino.cc/tutorials/uno-r4-wifi/led-matrix/) and get used to uploading sketches. Again, it's OK if you don't understand everything that's going on. Just make sure you get used to uploading sketches.

### 4. Print a value to the Serial Monitor
The [Serial Monitor](https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-monitor/) is a very valuable debugging tool. As the name implies, it monitors serial communication _from_ the Arduino _to_ the computer. It is not the same as an output console, i.e., it will not print errors unless you specifically program it, but is the only way to monitor values from your program live.

```cpp
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("Hello world!");
    delay(1000); 
}
```
Upload the above program to your Arduino and ensure you can see the "Hello, World!" output in your Serial Monitor. If you can't, ensure that the baud rate (`9600` in the above program) matches the baud rate on your Arduino IDE's Serial Monitor.


### 5. Download the Processing.org IDE
This term, by popular request, we will be using the Arduino to communicate with our computers and run small machine learning programs. [Processing.org](https://processing.org/) is an easy-to-use Java-based system that many people have made Arduino projects for. If you want more information, review the [Hello Processing](https://hello.processing.org/) tutorial.

---
## Lab
Welcome to your first lab! Today is designed to be something that you could complete on your own if needed. However, you will eventually need to make a group for your robot project. Use this time to meet new people, and discover who you like to work with in your lab. 

Make your own groups of up to **four people** for this lab. Work together, but each person in the group should ensure they can complete the challenges on their own Arduino board/computer setup.

### 1. Make an LED Blink

The first Arduino program that people typically build is [Blink](https://docs.arduino.cc/built-in-examples/basics/Blink/). It is a sort of "Hello, World!" program for Arduino. It can also be used as the simplest debugging program. If you're ever unsure of whether your board is working, unplug everything except a single LED, and make it blink.

We have also created a version of the circuit in [TinkerCAD](https://www.tinkercad.com/things/cQZG3VFxYOw-lecture-intro-hello-world). The circuit should be the same as above, but you can also run the TinkerCAD simulator to ensure that your physical Arduino is running the same as the simulated one on TinkerCAD.

```cpp
// the setup function runs once when the program is started
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}
```

Next, see how the [multimeter](https://www.sciencebuddies.org/science-fair-projects/references/how-to-use-a-multimeter) works. A multimeter will be your best debugging tool. Learn how to use it by filling in the table below in your sketchbooks or on your computer.

Test the continuity, voltage, and current of the circuit using the multimeter.
<p>Complete the chart by putting the **black probe** at the ground wire and the <span style={{color:"red"}}>**red probe**</span> at the component position listed below:</p>

| Position             | LED  | Voltage | Current |
|----------------------|------|---------|---------|
| Before the resistor  | On   |         |         |
| After the resistor   | On   |         |         |
| Before the LED       | On   |         |         |
| After the LED        | On   |         |         |
| Before the resistor  | Off  |         |         |
| After the resistor   | Off  |         |         |
| Before the LED       | Off  |         |         |
| After the LED        | Off  |         |         |


### 2. Communicate from Arduino to Processing
Extend your Arduino code to print the current on/off value of your LED. You'll need to use a `Serial.print()` and `Serial.println()` statement.

Once you've got your LED value printing on the Arduino, start the following Processing sketch:

```cpp
// Processing sketch to read value from Arduino

import processing.serial.*;

Serial myPort;     // The serial port
String incoming;   // Incoming serial data
int ledValue;      // Parsed sensor value

void setup() {
  size(400, 400);
  
  // List all available ports and print to console
  printArray(Serial.list());

  // Change [0] to the correct port index after checking the list
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 9600);
  
  myPort.bufferUntil('\n'); // Trigger serialEvent on newline
}

void draw() {
  background(0);
  fill(255);
  text("LED Value: " + ledValue, 50, height / 2);
}

void serialEvent(Serial myPort) {
  incoming = myPort.readStringUntil('\n');
  if (incoming != null) {
    incoming = trim(incoming);
    if (incoming.length() > 0) {
      ledValue = int(incoming);
    }
  }
}
```
:::tip Choose the right port

You may need to look through the port list to ensure you're communicating with your Arduino, rather than another device.

:::

### 3. Communicate from Processing to Arduino
Now, make a program that turns an LED on and off. We've provided starter code for you. 

Here's the Processing.org code (no changes needed):
```cpp
// Processing sketch to turn LED on/off

import processing.serial.*;

Serial myPort;
boolean ledOn = false;

void setup() {
  size(300, 200);
  
  printArray(Serial.list()); // See available ports
  
  String portName = Serial.list()[0]; // Adjust index as needed
  myPort = new Serial(this, portName, 9600);
  
  textAlign(CENTER, CENTER);
  textSize(20);
}

void draw() {
  background(ledOn ? color(0, 255, 0) : color(255, 0, 0));
  fill(255);
  text(ledOn ? "LED ON" : "LED OFF", width / 2, height / 2);
}

void mousePressed() {
  ledOn = !ledOn;
  myPort.write(ledOn ? '1' : '0');
}
```

Here's the Arduino code. Two changes are needed: look at the Blink code above for a hint.

```cpp
// Arduino code to turn an LED on/off via serial

const int ledPin = 13;  // Built-in LED pin on most boards

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();
    if (command == '1') {
      // TODO: Add your code here to turn on the LED
    } else if (command == '0') {
      // TODO: Add your code here to turn off the LED
    }
  }
}
```

### 4. Make an LED dimmer interface (homework)
For this week's creative challenge, make LED dimmer that takes commands from Processing, and outputs to your real, live LED via Arduino.

Think through the LED's [duty cycle](https://learn.sparkfun.com/tutorials/pulse-width-modulation/duty-cycle), i.e., how long it is off vs. on. There is also a helpful Arduino [Fade tutorial](https://docs.arduino.cc/built-in-examples/basics/Fade/). For the Processing sketch, you may want to look at the [Mouse 1D tutorial](https://processing.org/examples/mouse1d.html) for ideas.

Remember that we give top marks only for _exceeding_ the minimum requirements. For this week, we'll give you some hints. Try adding more LEDs, different keyboard or mouse inputs from Processing, or think up something entirely new that uses LED dimming.

**Submit a video of your working dimmer program on Piazza by the night before your lab.**

---
## TODOs
### By the end of this class, show your TA the following
- Your completed, working blink circuit
- Your completed voltage table
- Your completed, working LED control from Processing to Arduino

### Before the beginning of next class, complete the following:
- Upload a video to Piazza of your dimmer circuit working

### At the beginning of next class, show your TA the following
- Your completed dimmer program

Each lab will be marked out of 5. To get 5/5, you will need to come up with something extra that is not directly specified in the lab, i.e., you will have to be creative.

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.

_See [Teaching notes](/docs/concepts/teaching/labs/lab01) for extra info._
