---
title: Lab 08. Line Following 
draft: true
---

## Overview
[Link to Lab 08](/labs/lab08)

This lab introduces the line following challenge in the tournament. This is a long-standing version of the classic COGS 300 line challenge, so nothing too surprising. The one difference this year is that we're adding the IR sensors instead of photocells. Tell students that the photocells are an option, was traditionally how it's done, and we have many, many of them!

## Materials and Prep

## TODOs
1. Remind people about the whole tournament course, and that this is the last challenge.
2. Introduce the line-following challenge concept. Demo, either on paper or with a robot that is shut off, or, if you're feeling very ambitious, a robot that actually does follow the line.
3. Contrast emergent and detection approaches to line following. Emphasize that the emergent approach is one that works surprisingly well.
4. Guide them to start with the simple detection task first, i.e., starting and stoping on a line. This helps them to debug a lot of basics before jumping into emergent algorithm design.
5. Now let them move onto line-following, and do post-mortems.


## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab08.md` and run `marp lab08.md`.


```mdx
---
theme: uncover
---
# Lab 08: Tournament Prep: Line Following
Today we'll be practicing the last challenge you'll need to practice before the tournament. It will be line-following, then wall-following, then object detection.

---
# Line-following idea
Line-following robots detect a line on the ground, then follow the path.

---
# Line detection
Start by simply figuring out how to detect a line. Make a robot that detects a line, drives forward, and stops on a line.

---
# Simple line following
Design a robot that follows a line. Do NOT worry about making it go the "right" direction yet. Simply have it move along a line.

---
# Advanced line following
Now you can worry about directions, turns, and branches.


```