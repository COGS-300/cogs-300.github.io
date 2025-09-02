---
title: Lab 07. Object Tracking
draft: true
---

For this lab, we are performing object detection and tracking. Using the same ultrasonic sensors as for the last two labs, we will perform basic [depth mapping](https://en.wikipedia.org/wiki/Depth_map) by creating an array of distances. The purpose of this is to be able to move our robot towards an object. You will need to do this in the final tournament, where you will have to find and touch a goal object with your robot.

The basic conceptual idea is to scan using an ultrasonic sensor and a servo. We can map the angle of the servo to the distance from an object. Then, we can rotate the robot so that it is facing towards the angle that has the lowest value. Then, we can move the robot forwards at that angle, and restart the process.

This is likely to be an error-prone operation, so we can apply all of our signal processing and probability-based techniques to get good data. 

---
## Pre-lab
- Ultrasonic + servo
- Bayes filtering
- Signal processing

--- 
## Lab

### 1. Create a static ultrasonic sweep station
Before attaching anything new to your robot, create a stand-alone static sweep station out of an ultrasonic sensor and a servo, and an extra Arduino. You can finish most of this lab without attaching anything new to your robot, so get as much done with this subsystem before attaching it to the main robot.

Once you've physically connected the servo and the ultrasonic and wired both to your Arduino, create a test environment. You may want to draw out a [radial grid](https://en.wikipedia.org/wiki/Polar_coordinate_system) on a piece of paper, or something similar. Then, create an object that your servo will try to find. 

Think through the algorithm for finding the object. The simplest algorithm would be to move the servo, take a reading, repeat. If that works with high enough accuracy, great. If not, you might want to consider using a statistical filter or even Bayes.

Design a way to visualize your system. It could be as simple as using the Serial Monitor output to output the direction to the object, or as complex as trying to draw a histogram in Processing.org code.


### 2. Implement a sweep on your robot
You have at least two options for sweeping on your robot: (1) Attaching something like the sweep station to the robot; or (2) using the robot to sweep by turning the whole robot with a fixed ultrasonic sensor. There are advantages and disadvantages to both, and we've seen both be sucessful in the final tournament.

Experiment with sweeping in both ways. Once you've made a decision, write a sweep routine for the robot. Again, find a way to visualize the object's direction.

:::warning
Test before making any permanent changes to your robot.
:::


### 3. Perform live object tracking (homework)
Come up with a demonstration of your object-tracking syste working on your autonomous robot. It does not have to be perfect, but it should be able to reasonably accurately deterine the direction of the object. It's not required, but consider using a Bayes filter to get a probabilistic result.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.