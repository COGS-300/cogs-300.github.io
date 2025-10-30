---
description: Message-passing swarms
draft: false
---

import Image from '@theme/IdealImage';

# Swarms with Memory

## Introduction
If we think about swarms like physarum, or cellular automata like Conway's Game of Life, or Langton's Ant, we'll note that the "agents" don't really have memory, per se. Instead, memory is encoded in the environment. There is some state tracking with Langton's Ant, but that's really just a direction of the agent. If we allow for re-writable memory, we suddenly get a superpower: long-distance coordination, both in time and space.

### Materials
- [Agents](https://github.com/COGS-300/agents)
- [Processing](http://processing.org/)

---
## Activity
For this activity, we will simulate message-passing for simple swarms with short memories. In the included Processing sketch, there is a swarm of simple agents that follow a variation of the flocking algorithm (basically like multi-agent PID). They have a certain tendency to both come closer (cohesion) and stay apart (separation). They also have a sensor distance.

In this version, there's also a leader that randomly moves, and occassionally passes along a message in the form of changing colour. We'll see that different swarm dynamics create different problems in message-passing consistency.

### Download and Run the Processing sketch
Download the [Agents](https://github.com/COGS-300/agents) processing sketch from GitHub and run it. You should see a large white circle, and many smaller white circles. The small circles are the **followers**, and the large circle is the **leader**.

For now, use your keyboard to change the interaction dynamics of the followers. The arrow keys change the weight of the cohesion and separation. Find out what the different parameters do to create different emergent patterns.

### Analyze colour message-passing
Turn on colour message-passing by pressing the `spacebar`. Continue to play around with the settings while answering these questions:
- How do the messages propogate throughout different configurations of the agents? 
- What settings (if any) guarantee a stable flow of message passing?
- What settings (if any) guarantee a blocked flow of message passing?

### Design a message-passing algorithm to solve blocks
You can hopefully see that there's no guaranteed message-passing. Design an algorithm (and settings) that would facilitate message-passing. What needs to change?

<!-- Present the rest of this after lecture  -->


<!-- 
### Characterize the need for memory
Using the 0-9 keys, you can simulate a larger and smaller memory for the agents. In this example, if they have seen a colour recently, they won't change to it. There are many memory dynamics that you could imagine, but this one works on a simple first-in-first out basis.

---
## On your own
### TODO

---
## Philosophical Connection -->