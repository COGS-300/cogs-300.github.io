---
title: Lab 07. Object Detection
draft: true
---

For this lab, we are performing object detection. The purpose of this is to be able to move our robot towards an object. You will need to do this in the final tournament, where you will have to find and touch a goal object with your robot.

The basic conceptual idea is to scan using an ultrasonic sensor and a servo. We can map the angle of the servo to the distance from an object. Then, we can rotate the robot so that it is facing towards the angle that has the lowest value. Then, we can move the robot forwards at that angle, and restart the process.

This is likely to be an error-prone operation, so we can apply all of our signal processing and probability-based techniques to get good data. You are strongly encouraged to use a Bayes filter or another probability-based system, but it is not strictly required.

---
## Pre-lab
- Remind yourself of the [Bayes Filter lesson](/teaching/lessons/bayes-filter)

--- 
## Lab

### 0. Setup
Take a big black bin out and place it roughly two meters from a flat wall. Your robot will have to start facing a wall, turn around, and touch the big black bin. The bin location may be "randomized", that is, it should not always be directly behind your robot.

### 1. Implement a sweep on your robot
You have at least two options for sweeping on your robot: (1) Attaching something like an ultrasonic sonar tower with a servo to the robot; or (2) using the robot itself to sweep by turning the whole robot with the ultrasonic sensor fixed in a single position. There are advantages and disadvantages to both, and we've seen both be sucessful in the final tournament.

Experiment with sweeping in both ways. Once you've made a decision, write a sweep routine for the robot. Find a way to visualize the object's direction.

:::warning
Test before making any permanent changes to your robot.
:::

### 2. Implement a depth map
Set up an array that relates the angular position of your robot (or robot with a sonar tower) to the location of an object you're trying to detect by doing the following:

- Every index of the array corresponds to a direction that the robot is facing
- Every value of the array corresponds to the distance from your robot to the object

For example, if you use a 22.5° discretization, it might look like this to be facing a wall and sweep along it:

| Index   | Degrees  | Distance    |
|---------|----------|-------------|
| 0       | 00.0     | 5cm         |
| 1       | 22.5     | 10cm        |
| 2       | 45.0     | 20cm        |
| 3       | 67.5     | 30cm        |
| 4       | 90.0     | 45cm        |
| ...     | ...      | ...         |


### 3. Design and implement an object-tracking algorithm
Eventually, your robot should be able to find an object and drive towards it in a noisy and constrained environment. A very simple object-tracking algorithm would be: scan 180 degrees, drive towards closest object. However, if you happen to scan both the wall and the object, your robot could easily drive towards the wall when it should drive towards the object.

Instead, ask yourself how you could differentiate the wall from the object. 

A signal-processing approach might be: Does the wall have a different characteristic signal across the whole array than the object? E.g., does the depth map linearly descend for the wall, but have a "bump" where the object is? Is there a measure that you can derive from the signal that will indicate a different shape of object?

A Bayes filter approach might be: Can we represent each index not by a depth, but instead by a probability? Can we improve the probability with repeated measures? If so, how do we predict movement in the array?

### 4. Perform live object tracking (homework)
Come up with a demonstration of your object-tracking system working on your autonomous robot. It does not have to be perfect, but it should be able to reasonably accurately deterine the direction of the object. It's not required to use a Bayes filter for what you hand in next week, but it will likely help to think probabilistically. Remember, with robotics, "whatever works, works", so if you come up with a valid and creative new approach, that's great! 

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.