---
description: Designing an Ultrasonic Tower
draft: false
---

import Image from '@theme/IdealImage';

# Ultrasonic Tower

## Introduction
Now that we have learned to use the ultrasonic, we'll figure out how to detect a real object. 

### Materials
- Ultrasonic sensor
- Arduino
- Jumper cables
- [Ultrasonic Arduino Sketch and Wiring](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics?sharecode=EYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg).

---
## Activity
There are a few important steps to getting a good reading from a sensor. This activity will bring you through those steps, and then you will design something with an ultrasonic. The instructor will tell you when to move to the next step.

### 1. Make a paper prototype of an ultrasonic "radar" tower
Using an object (like an eraser) as a stand-in model for the real ultrasonic, place a model ultrasonic in the middle of a piece of paper. Now, place objects around the model ultrasonic. Act out the algorithm for object detection, and take paper measurements along the way:
1. Draw a straight line out from the model ultrasonic as far as you can go. If you hit an object, stop. If you hit the end of the paper, 
2. Record the distance in a list of pairs of numbers: the distance on one side, and the angle on the other.
3. Record the distance as the next item in a time series.
4. Turn the ultrasonic by a consistent angle, e.g., 22.5 degrees or 1/16th of a circle.
5. Repeat until you have completed one full circle.

### 2. Design an algorithm to determine the closest object
Using only the time series (but confirming with your eyes), design a deterministic algorithm that will produce the position of the closest object in polar coordinates, i.e., (distance, angle). Write in pseudocode or real Arduino code.

### 3. Re-run the paper prototype with some randomization
Now, re-run the algorithm, but throw in some randomization. Using a dice, coin, or other method of randomizing, slightly change the values of the signal as you go. For example, roll a dice to see how much you should lengthen or shorten the distance to an object. Write the new time series below your first one. Repeat as often as you can in the time we have.

### 4. Apply a filter
Decide which type of filter you would like to apply: threshold, minimum, maximum, average, or a few chained together. What will give you the most accurate map of the positions of the objects?

### 5. Wire your Ultrasonic
Using the diagram and code from here: [Ultrasonic Arduino Sketch and Wiring](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics?sharecode=EYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg), create the ultrasonic circuit. Print the ultrasonic values to the screen.

### 6. Implement your algorithm in code
Create the object detection algorithm you just designed in code. If you don't have a motor with you to turn the ultrasonic, use your hands. 

