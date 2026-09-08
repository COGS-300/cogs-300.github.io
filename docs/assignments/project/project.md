---
sidebar_position: 1
slug: /assignments/project
---

# Electronics Project overview
The assessment of your individual abilities in this course will be the personal electronics project. The project must be done individually because it is an individual assessment, but you are certainly encouraged to discuss the work with your classmates. This is your chance to demonstrate your engagement and mastery over the course subject matter. It is an open-ended creative project, but it must include at minimum:

1. An operating Arduino R4 and working circuit
2. A mechatronic system that senses and/or actuates a mechanism
3. An interactive decision-making system of some sort
4. A conceptually-rigorous illustration and/or demonstration of a core course concept

Basically, it needs to have at least a sensor, an actuator, a mechanism, and a brain. We will guide you towards developing this idea in class, during labs, and in one-on-one meetings.

## Requirements
Here is a deeper explanation of the above requirements.

### Concept
We have found that the best projects are not the most complex, but usually, simple ideas with a fully-realized concept. This what we mean by conceptually-rigorous. For example, a "drone" or "eight-legged spider robot" would be a bad choice for this project (we've seen many fail at this point). However, a "dice roller" was a particularly beautiful execution of this project (sorry, you can't use this one now that we've said it). What's the difference?

Robots that have generalized intelligence or support arbitrary abilities are quite complex. They require many degrees of freedom (lots of motors), highly-accurate sensing systems, and usually quite complex control systems. You are already getting a taste of this with your group lab project; you do not have enough time to build one of these by yourself in this class.

In contrast, purpose-built devices (like our dice roller example) only really need to achieve a single objective. They can only "do" one thing, and every component is oriented towards that purpose. The dice-roller robot did not need to use complex computer vision algorithms to recognize the dice. Instead, it relied on mechanical assumptions such as "if this button at the bottom of a cup is pressed through pressure, then the dice must be present." That's the level we want you to achieve for this project.

The conceptual part of your work may include intelligent systems on your computer, LLMs, email systems, or whatever you would like. However, we're only going to mark the parts of the project that you personally designed and built that directly connect to the Arduino. A simple rule is: everything from the computer to the Arduino is not marked. Everything from the Arduino to the mechanism is marked.

The reason for this is that this class is about ground-up intelligence and systems analysis and design. Top-down intelligence is an important topic, just not the focus of this class.

### Sensing
Sensing can be as simple as detecting a button press, or as complex as detecting heart rate variability through a blood oxygen sensor. The sensor must be an Arduino-compatible component. You are welcome to use other sensors, e.g., your computer's camera, but we will not "mark" them. For example, we have seen excellent projects that use computer vision to detect human body motion, and we allow and welcome them as parts of your design, but the computer vision components are not "for marks" since they are not the focus of this class. Instead, we want you to use Arduino-based sensors to learn about electronic signal processing.

The sensor must not be simply perfunctory, but part of the core interaction loop. For example, an ON button does not count as a sensor (although you're welcome to have one). If you instead have a "limit switch", that would indeed count as a sensor because you would be using as part of on-going interactive operation. Even though they are essentially the same electrical component, the purpose differentiates whether they meet the requirement.

### Actuation
The most obvious actuator is the geared DC motor that you use for your robot, but there are many other things that we can consider an actuator for this class: a fan, a vibrotactile device, a speaker, a Peltier cell, an electromagnet, a solenoid, and more (ask us if you're unsure). Like the sensor, it must be an Arduino-compatible component. So, the speakers on your computer don't count (although you're welcome to use them). 

You may wonder about LEDs, displays, and other output devices. You are welcome to use them, and, if they are Arduino-compatible devices, we will consider them as part of the marking scheme, but they are not considered actuators. The basic rule is: if you can run the component off of your computer directly, it's fine to use it but it's not marked, and if you can run it off of the Arduino, we will consider it for marking.

### Mechanism
A mechanism is a series of connected parts that perform a task or create/constrain motion. At minimum, this will be a simple mechanism such as a lever, pulley, wheel and axel, linear guide, spring, inclined plane, wedge, or screw. It can also be more complex, like a gear train. The mechanism can be input, output, or both. It can be small or large, and it can be a part or encompass the whole device.

The requirement here is that you have to make the mechanism. You can use Lego, cardboard, popsicle sticks, or other craft materials. You cannot count, e.g., the lever that is already inside a button that you bought as the mechanism.

### Interactive Decision-making System
At minimum, your system must run off of an Arduino R4 and perform some kind of action that requires decision-making over a variable environment. This can be as simple as a series of if-then statements, or as complex as a remote LLM-backed smart thermometer that incorporates weather and personal preferences. We do not value the latter more than the former: as above, we mark the part that starts at the Arduino.

The point of this really is "make it interactive." For example, we have had projects such as a very beautifully-constructed music box, but had no interactivity other than "on-off" and therefore really didn't meet the project requirements. On the other hand, we have had projects such as as a not-very-beautiful hugging robot that had wires falling off, but very much met the project requirements because it responded to hugs. Put your effort into making something interactive, rather than pristine.

## Project Milestones
There will be three milestones for the project: a paper prototype, a works-like prototype, and a final prototype. The final prototype should be "good" but not perfect: it can still be a prototype, but it needs to be well-developed.

- First Paper Prototype and Operations Manual
- Intermediary Works-like Prototype and Operations Manual
- Final Prototype and Operations Manual

## Final Note on Cost
The project is not designed to be expensive. We will enforce a $50 limit to purchased materials. Scavenged materials can exceed $50 in value, but the purpose of the project is to make do and be creative with limited materials, not to buy your way into a good mark.