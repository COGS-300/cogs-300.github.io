---
title: Lab 01. Interfacing with Arduino
---

## Overview
[Link to Lab 01](/docs/labs/lab01)

This lab will be most people's introduction to a few big, new ideas that are at the core of the course's technical content:

1. Physical circuit design
2. Controlling physical objects with a microcontroller
3. Event loops and real-time operation
4. Serial communication between a microcontroller and a computer program

Many of these ideas are difficult to get across conceptually. It is best to mostly allow them to be understood experientially first. It may take some people the whole term to really understand them. 

## Materials and Prep
- Arduino
    - [Arduino IDE](https://www.arduino.cc/en/software)
    - [Getting Started](https://docs.arduino.cc/learn/starting-guide/getting-started-arduino/)
    - [LED Matrix Tutorial](https://docs.arduino.cc/tutorials/uno-r4-wifi/led-matrix/)
    - [Serial Monitor](https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-monitor/)
    - [Blink](https://docs.arduino.cc/built-in-examples/basics/Blink/)
- Processing
    - [Processing.org](https://processing.org/)
    - [Hello Processing](https://hello.processing.org/)
- TinkerCAD
    - [TinkerCAD](https://www.tinkercad.com/things/cQZG3VFxYOw-lecture-intro-hello-world)
- Tools
    - [multimeter](https://www.sciencebuddies.org/science-fair-projects/references/how-to-use-a-multimeter)
- Code
    - [Lab 01 GitHub](https://github.com/COGS-300/lab01)

Make yourself familiar with the basics of the above links. Know how to build a circuit, use the multimeter, and communicate between Arduino and Processing. It's always better to a bit more prepared than the students, e.g., build your own version of the design challenge.

## TODOs
1. **Introduce yourself to the students.** Tell them your major, your experience with COGS and robotics, and why you're excited to TA the course. Tell them about your role, office hours, and contact info (include Piazza and COGS discord).
2. **Introduce the students to the lab.** Go over lab rules, safety procedures, and equipment location. Tell them about the shelves, black boxes, and equipment storage/signout procedures.
3. **Demo TinkerCAD.** Show TinkerCAD, including the code, visual circuit programmer, engineering circuit diagram, and simulation features. Show the multimeter in TinkerCAD.
4. **Demo and explain the Arduino.** Show the same things from TinkerCAD on the real, live, Arduino. Show the LED matrix, serial monitor, and blink sketch. Demonstrate the key pins and concepts behind the pins.
5. **Demo the multimeter.** Show how to get a continuity reading, voltage reading, and current reading.

## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab01.md` and run `marp lab01.md`. Pre-written [markdown](/slides/labs/lab01.md) and pre-rendered [html](/slides/labs/lab01.html) available.


```mdx
---
theme: uncover
---

# Hello, my name is ______.

Major: ______.
Office hours: ______.
Contact info: ______.
Piazza link: ______.
Discord link: ______.

---

# Welcome to the COGS 300 Lab

The COGS 300 Lab is available for you to use during the day (7:00am - 9:00pm). You are welcome to claim a shelf with your team, use a black lock box, and use the equipment. 

---

# Lab Rules

1. **Clean up after yourself.** Clean up _more_ than what you used. What goes around comes around. Ensure your table is totally clear.
2. **Turn everything off.** Ensure everything (i.e., lights, soldering iron, etc.) is _off_ and _cold_ before you leave.
3. **Sweep and remove trash**. If there is trash in the trash box, take it out. Waste sorting is around the corner from Chris and Colleen's office.

---

# Safety Procedures
<style scoped>section{font-size:30px;}</style>

1. Soldering must be only done on the soldering table.
2. The charcoal filter fan must be running while you solder.
3. Familiarize yourself with the location of the fire extinguisher.
4. Familiarize yourself with the exit routes.
5. Unplug anything that starts to get hot, produce smoke, or smell bad.


You are working with live electricity. Although the Arduino's 5V output is not enough to damage you, it can damage your computer or Arduino. Do not plug anything in unless you are _certain_ that it is safe. Be particularly certain of anything that plugs into the wall. _Wall power can kill you._

--- 

# Equipment rules

1. All tools are to remain in the COGS lab. No exceptions.
2. Robot parts are allowed to be borrowed, but must be signed out.
3. Return all parts that you have borrowed and sign them back in.
4. Do not borrow more than you absolutely need. 
5. If you need something for more than a week, buy it.

---

# Lab Storage

1. You're free to claim a shelf with your team.
2. You're free to put a lock on a black plastic box.
3. Shelf storage must be removed by the last day of class or it will be thrown out or added to lab inventory.

--- 

# TinkerCAD


```