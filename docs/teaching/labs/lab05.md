---
title: Lab 05. Wall-following
draft: true
---

## Overview
[Link to Lab 05](/labs/lab05)

This lab is our introduction to wall-following. The most difficult thing to get across in this lab is that the algorithm can just "emerge" rather than require very explicit commands. 

My hope is that students can gradually come to the emergent algorithm. However, it make take some coaching.


## Materials and Prep
Build a wall-following robot.

## TODOs
1. Introduce them to the concept of wall-following robots.
2. Act out/demonstrate follow-me and wall-following with an unpowered robot.
3. Outline broad approaches to the algorithm.
4. Remind them about PID.
5. Go around and do first post-mortems.
6. Help out with the lab..

## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab05.md` and run `marp lab05.md`.


```mdx
---
theme: uncover
---
# Lab 05: Wall-following
Today we'll build our first wall-following robots. This will also be a core challenge in the tournament.

---
# Wall-following
Wall-following robots drive alongside a wall, following it as it turns corners.

---
# Demonstration of wall following

---
# Designing a Wall-following Algorithm
Think through the algorithm for wall-following. There are different cases:
- Following a straight wall
- Turning an inside corner
- Turning an outside corner
- Turning a corner on the left or right (choose only one today)

Before you code, act out your algorithm design with an unpowered robot.

---
# PID 
You can use a very simple PID algorithm to solve most of the problem:
`error = measurement - set_point`
`output = p * error`

---
# Post-mortems and Work
Let's go!

```