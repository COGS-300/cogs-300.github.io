# Servo

## Introduction

A servo is a DC motor, gearbox, motor driver, and microcontroller all in one little package. The ones we use have been engineered for remote controlled model aircraft, so they are very precise, but have a limited range of motion. In this activity, we will learn how to wire and control a servo using and Arduino.

### Materials
- Servo motor
- Arduino
- 3 x Jumper wires
- [Servo TinkerCAD](https://www.tinkercad.com/things/hcDQxz3cDFx-servo?sharecode=uJvyGNifyDRr85e7w36UiAWuWBPoZYiwyoyQtH2kXko)

---
## Activity

### Wire the Servo
Following the [Servo TinkerCAD](https://www.tinkercad.com/things/hcDQxz3cDFx-servo?sharecode=uJvyGNifyDRr85e7w36UiAWuWBPoZYiwyoyQtH2kXko), wire your servo to the Arduino. Note that the servo must be connected to a PWM pin to be able to work properly. A PWM pin has a tilde `~` beside the number.

### Run a sweep to test
The basic testing routine for a servo is to sweep through the full range of motion. You can refer back to this whenever you're unsure whether your servo is working.

```cpp
// https://www.arduino.cc/en/Tutorial/LibraryExamples/Sweep
#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
}
```
The servo should move back and forth between its minimum position and maximum position. If it doesn't, check the wiring.

---
## On your own
Servos are nice because they incorporate sensing, control, and actuation into one modular package. Consider playing around with them to do simple actuation tasks on your own. For example, a COGS 300 alumni made his own fish feeder using servos.

Another option is to create a Serial Monitor interface so that you can send commands to the servo and check that it is moving directly to the position that you want. This will be useful as a debugging tool for later.

---
## Philosophical Connection
Servos are their own contained modules. They operate only by getting a signal from the Arduino and moving to the position that it commands. They run an algorithm to get the servo arm close to the position (which we'll learn about soon), so they do perform calculations, sense the world, output an action to the world, and have some kind of "reasoning" ability. They also can look quite lifelike, and even seem to have a will of their own. In many ways, they can seem "alive" and "intelligent" in more than one sense.

Is the servo alive? Is the servo intelligent? Does it have even a tiny sliver of aliveness or intelligence? Why or why not? If not, can you make your criteria consistent with more powerful computational machines? If yes, how much of the servo could you remove before it starts being neither alive nor intelligent?