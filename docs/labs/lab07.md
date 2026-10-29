---
title: Lab 06. Line-Following and BYO-Tournament
draft: false
---
It's time to build the tournament. Each lab will take responsiblity for constructing, maintaining, and amending one of the challenges of the tournament.

- Friday Lab will be first, and build the line-following challenge.
- Monday Lab will be second, and build the wall-following challenge.
- Wednesday Lab will be last, and build the object-detection challenge.

Your TAs have been briefed on the design considerations for each challenge, and will guide you through the process of building.

For your lab homework, you will work on the line-following challenge.

---
## Pre-lab
- None

---
## Tournament Setup
Start the lab by laying out your lab's section of the tournament. Make it large enough to make sure that everyone can practice on it. 

--
## Lab

### 1. Add two or more IR Sensors to your robot
IR sensors have an LED that emits infrared light, and detect the amount that is reflected back. We will use it for the line-following challenge. You will likely need at least two to detect lines (although, happy if you prove us wrong and can do it with one).

The IR Sensor are tunable, which means you can change the on-chip threshold filter by twisting the potentiometer that is on the chip by using a screwdriver. It can a binary signal based on this turned threshold filter.

To tune it, point the sensor at a piece of white tape. Then, point the sensor at the ground. You want it to turn on when pointed at the white tape, and not at the ground.


### 2. Get the robot to start and stop on a line
To test your robot, get it to stop and start on a line. Start the robot in an open space, then get it to stop once it hits a line. Or, get it to start on a line, and drive until the tape ends.


### 3. Adapt the start-stop algorithm to turn
Your initial line-following robot should follow the same process as the wall-following robot. Think about it like a ball ping-ponging along the sides of the white tape. You want your robot to drive forwards and a little bit left until the sensors leave the tape. Then, turn right until it's back on the tape. Then drive forwards and a bit left again. Similarly, if the robot leaves the right side of the tape, the robot should turn left.


### 4. Solve the line maze (homework)
Make your robot solve the line-following portion of the maze, even if very slowly. Add more sensors if you need. The algorithm in (3) will certainly get you to finish the line-following, but it might not be very fast. For next week, at least get the slow version working. But, if you can speed it up with, e.g., Bayes, this would be an excellent place to use probability.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.