---
title: Lab 10. BYO Tournament and Demo Day
draft: false
---

## Overview
[Link to Lab 10](/labs/lab10)

For this lab, students will collectively build the tournament challenges. This will be a bit of a messy collective process—that's the plan! At the same time, we'll do paper prototype demos. 


## Materials and Prep

## TODOs
1. Outline the design parameters of the tournament.
2. Ask people to set up their demos.
3. Encourage peer critique during post-mortems.


## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab10.md` and run `marp lab10.md`.


```mdx
---
theme: uncover
---
# Lab 10: BYO Tournament
Today we will build one challenge from the tournament and demo your first paper prototypes.

---
# Tournament Transitions
- Order will be Line-following -> Wall-following -> Object Detection
- Transitions:
1. Start of line-following needs some kind of symbol and calibration area.
2. Line should extend into the first section of wall-following.
3. End of wall-following should extend into the arena slightly.

---
# Line-following suggestions
- Branching is very difficult for lines...but possible
- Loops are possible, but come up with a strategy for detecting them
- Don't make the start and end a straight shot (makes 'cheating' easy)
- Put at least one hard angle as a challenge
- Consider making some ramps, traps, and other dynamic problems

---
# Wall-following suggestions
- Branching for wall-following is easily solvable and highly suggested
- Avoid loops, since they're hard to detect here
- Make sure the robot can indeed make all physical turns needed
- Possible to augment with lines if you want to make a trap

---
# Object detection suggestions
- Size and shape of the object matters, try big before small
- Decide what the edges of the arena will look like (i.e., short walls, tape, etc.)
- Decide whether you want distractors and/or hints

---
# Demo Day
Get your paper prototypes out and participate in a group critique during your post-mortems.
Visit the other groups and provide helpful feedback. Good job on getting to this first big milestone!

```