---
title: Lab 07. Bayes Filter and Project Planning
draft: true
---

## Overview
[Link to Lab 07](/labs/lab07)

This lab introduces the object detection challenge in the tournament. However, we are also dedicating a signifcant amount of class time to project planning. It's also a new lab, so we'll see how it goes.

## Materials and Prep

## TODOs
1. Introduce the official milestones
2. Announce that they should think through their personal project in terms of multiple prototypes. They might be imagining that they can "just build" a paper prototype, but make sure that they understand that the paper prototype due in Lab 10 is really just a starting point, and should probably have multiple "paper prototypes" before then.
3. Introduce the idea that a prototype answers a core question. Tell them that you'll be asking that for each project milestone: what are you answering with this prototype?
4. Circulate while they develop their milestones. If things look too simple or they are lost, get them to make sketches live, then estimate the amount of time it would take to get the sketch done.
5. Reiterate the handins before moving on.
6. Introduce the object-detection arena. Mention that this is just like the design challenge, but on the robot.
7. Emphasize further that the goal is to have (a) a probability model of the object (not just straight detection); and (b) to drive towards the object (sort of). This is a hard challenge and it's just the introduction of it, the final challenge will take a few weeks of work.


## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab07.md` and run `marp lab07.md`.


```mdx
---
theme: uncover
---
# Lab 07: Bayes Filter and Project Planning
Today we'll be using Bayes to detect objects. We'll also lock down project planning.

---
# Paper Prototypes 
In Lab 10, you will demonstrate your paper prototypes.
You should really have built a few prototypes before then: iteration is key to design.

---
# Prototype with Purpose
Every prototype has to have a purpose, i.e. "looks like", "works like", "feels like", etc.
Answer a core question with each prototype. What are you unsure of? How does this prototype help you resolve that uncertainty?

---
# Prototype Milestones
For each prototype, figure out how long it will take, what it will cost, and what to do if it goes wrong.

---
# Handins
- Pitch, budget, timeline: hand in as a PDF for next lab
- Sketches and other creative work: keep in your sketchbook and show to teaching staff during your sketchbook review
- Prototypes: refer to in your sketchbook, keep somewhere safe, show during Lab 10 and Demo Day on last day of class

---
# Object Tracking
The robot tournament will include an object-tracking arena.

---
# Bayes Filter and Object Tracking
Adapting the code from class, apply Bayes Filtering to track the probable location of the object. Then, drive your robot towards the object. Remember, this may take you a whole month to complete! All that is required this week is that you make a good start.

```