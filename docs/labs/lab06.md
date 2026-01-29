---
title: Lab 06. Paper Prototypes and BOMs
draft: true
---
Today, you will demonstrate your looks-like paper prototypes. The point of the paper prototype is to have a clear idea of how your system will work before you commit to a design. That also means that you need to take the paper prototype seriously: something that simply looks like your design but doesn't attempt to function like it will not tell you enough about which parts you need.

For these paper prototypes, really work out all the details of how the design will operate. If there will be a screw somewhere, draw it, mock it up with a pin, or somehow represent it on your paper prototype. The process of building it will teach you a lot about what is feasible. If you need a Wizard of Oz script, don't be satisfied with hand-wavy "it will just work." Look at the details.

## Project Paper Prototypes
### Setup and critique
Set up your paper prototype on your table, and prepare to demonstrate how it will work. Be prepared to ask questions and answer questions. Have your BOM ready. Expect critique!

Once you've set up, take turns in your group explaining your prototype. Once everyone in the group has heard and critiqued each other's prototypes, roughly half the group can start to circulate around the room. Switch when you're ready. Someone should be at the group table at all times to demonstrate the prototypes, but don't leave just one person there the whole time.

### Get TA feedback
Your TAs should give you brief feedback on what works and doesn't work about your prototype. You will have at least one in-depth meeting with your TA about your project, but not today. Don't think of this as "approval" as much as the first step in an on-going iterative process to improve your prototype. No design is ever perfect immediately!

## Lab
For this lab, we'll be focusing on creating line-following robots. In some ways, they're simpler than wall-following robots. 

From a detection perspective, you may consider it important for your robot to detect the state of the line and itself. You can use all of the signal-processing and modelling techniques we've discussed so far: threshold filters, average filters, Bayes filters, or Bayes networks. Those will come in handy for many things that are really important to detect. 

However, from an emergence perspective, you may consider that it's not very important that the robot "knows" its own state, or the state of the environment. You may instead decide that as long as it "works it works." Emergently "detecting" a corner may not involve any explicit detection whatsoever; instead, the robot may just follow a very simple algorithm of bouncing back and forth across the line.

We'll try both in this lab, starting with the emergent algorithm, and ending with the detection algorithm.

### 1. Wire, test, and tune IR sensors
![IR Sensor wiring diagram](/img/IR-sensor.png)

Start by wiring a demo version of the IR sensor to a spare Arduino. Your IR sensor may have three or four header pins that you can wire to your Arduino. The easiest to use will be the one that has a `D` for digital output. However, if you do have an `A` for analog or somethint that simply says `out`, you may also be able to get readings that vary.

Notice that the IR sensor has a little potentiometer on it. You can turn it to change the sensitivity threshold for the sensor to output a `HIGH` signal. For most models, you can also see a little LED that will turn `ON` when the sensor detects something reflective.

Tune the IR to reliably differentiate pure white from a background colour, such as the floor or a table. You may have to tune the sensor more than once, particularly if lighting conditions change, the thing you're detecting changes, or the background you're differentiating from changes!


### 2. Add one or more IR sensors to your robot
Now that you have a working IR sensor, add at least one to your robot. You can add up to three later, but not everyone needs three, so start with one. Go through the same process as above tuning the robot. Put a piece of white tape on the floor or desk, or use a piece of paper. Make sure the IR sensor is turned to work in multiple environments.


### 3. Make a line-detecting robot (just like lab 04)
Put two pieces of tape parallel on the floor and spaced out by a couple of feet. One piece will be the start. One will be the end. Make the robot start on a line, drive foward, and stop on the second line.

An advanced version would be a robot that starts without a line, detects the first line, stops, starts again, finds the second line, does a 90 turn, then drives until the second line, etc. This will be very hard, so try it only after the rest of the lab.


### 4. Make a line-following robot (homework)
Your goal for this section is to make a robot that simply follows the line. For the moment, nothing fancy is needed. The robot should drive forwards along the length of a long piece of white tape. If it veers off of the tape, it should turn back towards the tape. It's best think about this in slow motion. Draw out cases for the robot moving millisecond-by-millisecond. 

For example, if you have only one IR sensor on your robot, you can detect only if the robot is on or off of the white tape. But you can use your motor signals to give you a clue about how to make the robot behave. So, if the robot was turning left, and now it doesn't detect the tape, try turning right until the robot detects the tape again. However, if you have more than one IR sensor, you might be able to get away without storing information about how the robot was previously moving.

Design the algorithm for the simplest possible line following and implement on your robot.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.