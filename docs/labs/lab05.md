---
title: Lab 05. Wall-following
draft: true
---

For this week's lab, we are adding [ultrasonic distance sensors](https://www.youtube.com/watch?v=2hwrDSVHQ-E) to perform external long-range sensing. We'll be using this to follow walls and eventually solve mazes. Eventually, you may want to try sensor integration, that is, mixing the telemetry from the wheel encoders with the long-distance external sensing from the ultrasonic. However, for today, we'll just work on getting used to the ultrasonic.

The ultrasonic sensor works just like [sonar](https://en.wikipedia.org/wiki/Sonar), in that it triggers a pulse of sound, then waits to see how long before the sound bounces back to measure distance. One side is the speaker, the other the microphone. Also just like sonar, that means that we don't have many details about the detected object, and that there are many things that can create errors. For example, you couldn't tell the difference between a whale and a similarly-sized submarine just from a single sound pulse.

There are other sources of error as well. The object that you're trying to detect can't be too close, or too far. There is some possibility of reflection, refraction, or diffraction. In other words, you could bounce a soundwave off of two objects and get an incorrect reading, have the soundwave change speed due to a change in media, or have something be too small and have the soundwave bend around it. You will have to deal with these sources of error in your robot construction, code, and sensor usage.

Don't think of these limitations as serious drawbacks: every sensor has its limitations and advantages. You might imagine that a laser distance sensor is better, but, actually, it has serious drawbacks as well. Instead of thinking about these in terms of how good or bad they are, ask instead "what about this sensor is effective or ineffective for what I'm really trying to do?" Instead of problems, think of design tradeoffs. Many generations of COGS students have made excellent robots using ultrasonics, and they're used in industrial applications every day. A good roboticist makes the most of their equipment.

---
## Pre-lab
- Review ultrasonic distance sensors from class materials, including building circuits
- Review this video of a [maze-solving robot competition](https://www.youtube.com/watch?v=ZMQbHMgK2rw)

---
## Lab
In this lab, we'll start with wiring ultrasonics on their own. Then, we'll add them to your robots, using them to sense distance to a wall. Finally, you'll follow walls, making turns along corners.


### 1. Wire and test a solo ultrasonic
Start by wiring a single ultrasonic sensor by following this [TinkerCAD wiring diagram](https://www.tinkercad.com/things/dCqOWJ6agPD-ultrasonic-distance-sensor?sharecode=uBjW7uq2wRdtkQ6FHpULRSTInpywyLwIz3R_Wy3qjOU). Use one of your team's Arduinos to ensure that you're getting consistent and accurate sensor readings. Keep this ultrasonic on hand while you prepare the next part.


### 2. Add an ultrasonic to your robot
Using the above circuit as a template, add an ultrasonic to your existing robot. You might decide to change your wiring system to accommodate the new pins that you need to use, the additional power requirements, or just to manage the mess of the wires ontop of your robot. Take photos and make notes about the changes that you make to the robot:
- What was working before the addition of the ultrasonic?
- What changed after the addition of the ultrasonic?
- Do any measurements seem different before or after?
- How does the onboard measurement system compare to your solo ultrasonic?

:::warning
You will likely have to reposition or add another ultrasonic sensor at some point, so do not make this a permanent connection. Paper prototype where possible.
:::


### 3. Create a straight-line "Follow Me" robot
Using the concept of a P-controller (the P from PID), create an algorithm for a robot that maintains a particular distance from a hand, piece of paper, or other flat object. For example, you could choose the robot to always maintain a distance of `25 cm`. 

To implement a P-controller, when the robot is far away, it should move faster. When it is close to the target set point of `25 cm`, it should move slower. This will follow the equation of:

```
error = measurement - set_point
output = p * error
```

Where negative output means backwards, and positive means forwards. Remember that you will have to `map` output to the range accepted by your motor controller. 


### 4. Autonomously follow a straight wall
Now, reconfigure your robot so that you can maintain a distance from a wall while driving *along* it. You may add another ultrasonic, or, potentially reposition your current one.

Develop an algorithm that allows the robot to drive forwards, but maintain a set distance from the wall.

:::tip
Design *for* error, rather than trying to *avoid* error. The best robots use error wisely to their advantage.
:::


### 5. Turn a corner (homework)
Once you have your robot confidently driving along a straight wall, now you need to design for a corner. We leave the exercise open to your interpretation, but consider the following cases:
- **gradual corners**, i.e., the robot is following along a curved wall that slowly makes a 90° turn.
- **inside corners**, i.e., the robot is following along a wall and suddenly comes upon another wall.
- **outside corners**, i.e., the robot is following along a wall and then suddenly runs out of wall.

Are there any other cases that your robot might come across? Is there a different between left and right turns? Come up with a robot demonstration of your turning system while following a wall. Remember: simpler is better.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.