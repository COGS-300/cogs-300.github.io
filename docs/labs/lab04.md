---
title: Lab 04. Localizaton
---

In lecture, we brought up the concept of [telemetry](https://docs.wpilib.org/en/stable/docs/software/telemetry/telemetry.html), that is, recording live data on your robot's position. and [localization](https://en.wikipedia.org/wiki/Robot_navigation), that is, figuring out where your robot is on a map. 

If you think about a map, it has plenty of *reference points*, or places that you can refer to when making some kind of measurement. The reference point can be, say, a doorway. The measurement can be something like *ten paces South from the doorway if facing the doorway is North*. You can then localize yourself relative to that doorway on a map. However, in the same way where "paces" is a form of measurement that is full of inaccuracies, robot motion is full of the same kind of errors.

Without external sensors (which we'll get to next week), robots can only refer to themselves for measurement. Using encoders, we can measure how much a wheel has turned. The encoders, as you have seen, have low spatial resolution, which is one source of error. But, there are many other sources of error such as wheels slipping or the shape of the tire dragging the robot one way or the other. 

In this lab, you will be attempting to get a robot to autonomously drive from a starting point to an ending point. At first, you will drive it like a remote control car, recording the telemetry from the wheels. Hopefully, you will then get the robot to recreate the path on its own (this will prove difficult). The point of the lab isn't success, but to characterize and minimize error (and to make you really want the next step, external sensors).

---
## Pre-lab
- Encoders
- Encoder explanation
- Encoder circuit
- Serial monitor communication
- Remote sensing

---
## Lab
The point of today's lab is to introduce you to encoders, common errors with localization, and remote telemetry. We'll go through these piece-by-piece, so, as with previous labs, you may choose to split the effort in your group.

### 1. Add encoders to your robot

### 2. Print telemetry to your Serial Monitor

### 3. Remote control your robot from a start position to a goal

### 4. Record and replay the telemetry