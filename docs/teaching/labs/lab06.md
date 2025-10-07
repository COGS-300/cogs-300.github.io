---
title: Lab 06. Detecting Walls
draft: false
---

## Overview
[Link to Lab 06](/labs/lab06)

This lab introduces a practical version of Bayes' theorem. Last year, this lab did not go very well. However, I decided to dedicate an entire lecture to prepping the lab, so hopefully it will go better this year. I've also cut down some of the emphasis on experimental setup, which was probably the most difficult part of the lab.

We will also be doing the project kick-off today. This is also the first time for the project kick-off, so we'll have to be on our toes a bit. I've decided to make the next lab more project-focused, so this won't be the last time you have lab time to talk about the project before the demo day deadline.

## Materials and Prep

## TODOs
1. Introduce them to the day: project kick off and Bayes
2. Show some examples of good project ideas. Emphasize that we're not looking for a next-level project, we want something creative but not technically complicated.
3. Run the project brainstorm, remind them that the brainstorm is not a commitment, it's an idea-generating session. Try to divert from project ideas that copy the robot from lab, or other design challenges.
4. Get them started on sketching and project-planning. We'll spend next lab doing some formal exercises, but they should bring a solid idea to next lab.
5. Explain Bayes again and refer to the lecture notes. 
6. Help out with the lab..

## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab06.md` and run `marp lab06.md`.


```mdx
---
theme: uncover
---
# Lab 06: Detecting Walls and Project Kickoff
Today we'll be using Bayes to detect walls. We'll also kick off the project.

---
# Project requirements
1. An operating Arduino R4 and working circuit
2. A mechatronic system that both senses and actuates (or displays)
3. An intelligent decision-making system of some sort
4. A conceptually-rigorous illustration and/or demonstration of a core course concept

A button and a couple of servos may work for the circuit! More complicated circuit does not mean better marks.

---
# Project examples
Put together some examples of creative project ideas with minimal circuit design.

---
# Project brainstorm
In your groups, brainstorm as many different project ideas as you can. The goal is quantity, not quality!

---
# Quick sketches
Take an idea that you like from the brainstorm (or your own previous idea) and make a quick sketch.

---
# One-liner
Format your project pitch as a one or two sentence description.

---
# Homework: pitches, sketches, and budget
By next week, you should have an idea of what you're working on for the project. Write a short paragraph and sketch it. Write a full list of the equipment you'll need. Make a budget: keep the cost below $50.

Remember, this does not have to be complex, but it does need to be creative.

---
# Bayes theorem
$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

---
# Homework goal: Live predictions
By next lab, get your robots making predictions. They don't need to be 100% accurate!
```