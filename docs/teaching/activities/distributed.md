---
description: Introducing the Distributed Kingdom
draft: true
---

import Image from '@theme/IdealImage';

# Distributed Kingdom
## Introduction
Imagine that you are a trusted advisor in a kingdom from the middle ages. The kingdom is on an ithmus; there is a kingdom to the North, a sea to the East, another kingdom to the South, and an ocean on the West. The king has asked you to design a communication system for his kingdom. How will you achieve the best communication system for least amount of resources?

This storybook idea is an analogy to real life distributed communication networks. Using the Distributed Kingdom to really think through problems of message-passing will help you understand the design decisions for computer networks.

### Materials
- Pen and pencil

---
## Activity
### Brainstorm communication methods
Think about all of the communication methods that might be available to a real-life medieval kingdom (no magic allowed, sorry!). Try to ground your ideas in the practicalities of message passing. Evaluate your ideas based on the following criteria:
- What is the trade-off between speed, message complexity, and accuracy?
- How can you ensure that a message really makes it to the receiver? When does that matter?
- Which methods work better for different situations?

### Design a method for communicating troop movements
Every once in a while, a threat comes to the kingdom. Either there is an invading army spoted in the North or South, or pirates appear on the coast of the East or West. If the king wanted to simply command his citizens to take up arms and travel towards the threat (i.e., communicate only go North, East, South, or West), what would be the best method? Think through:
- How fast should the message propagate throughout the kingdom?
- Does it matter if an enemy knows that troops are moving? It may or may not.
- What social protocols need to be in place ahead of time to ensure that people know what the messages mean?

### Design a method for fast arbitrary communications
Let's say that you need to communicate messages very quickly, say, taking only a few minutes to travel across the kingdom. Also, say that these messages may need to communicate sentences or paragraphs of text. What methods could potentially work for that? Keep in mind the following:
- The messages need to be fast, so letters are too slow
- Any communication protocol needs to be reasonable for a human to use
- Natural challenges like mountains, long distances, forests and valleys will be present in the kingdom, so you need to design for robustness.


---
## On your own
Design a system for the kingdom that allows for messages to go to a particular location. Think through the dynamics of the network: does every message need to pass through every node? If not, why not?

---
## Philosophical Connection
Most computer systems are distributed systems to some degree. Your robot is a distributed system. Internet infrastructure is a distributed system. However, there's a clear difference between something small and something big. Although the same distributed system theory is appropriately applied to both small computers and big networks, does the similarity in protocol make a difference when there's a difference in scale? In other words, does the difference in size mean a difference in kind?