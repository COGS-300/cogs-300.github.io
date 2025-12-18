---
description: Slime mold simulations and extended cognition
draft: true
---

import Image from '@theme/IdealImage';

# Physarum

## Introduction

Physarum is an exploration of slime molds. [Sage Jenson's Physarum](https://cargocollective.com/sagejenson/physarum) artistic exploration into physarum gives a fascinating and beautiful demonstration of emergence, as well as a good technical explanation of how to model physarum.

Physarum builds off of our understanding of Langton's Ant and Conway's Game of Life, where the environment and agent is not a clear distinction. This is a [demonstration of the externalization of cognition](https://www.pnas.org/doi/abs/10.1073/pnas.1215037109).

### Materials
- [Sage Jenson's Physarum Explorer](https://www.sagejenson.com/36points/).

---
## Activity
For today, we will explore the emergence patterns for physarum. There are many controls to make sense of:

```
Sensor Distance Base
Sensor Distance Power
Sensor Distance Scale
Sensor Angle Base
Sensor Angle Power
Sensor Angle Scale
Rotation Angle Base
Rotation Angle Power
Rotation Angle Scale
Move Distance Base
Move Distance Power
Move Distance Scale
Sensor Y Offset
Sensor X Offset
Deposit Amount
Decay Rate
Blur Passes
Draw Opacity
Fill Opacity
Dot Size
```

An explanation of the basic controls is [available here](https://cargocollective.com/sagejenson/physarum). What we are seeing is thousands of little point-like "agents" who leave trails of "slime" behind them as they move. The slime decays with time. The agents move forward, but will slightly turn towards areas directly around them that have more slime.

Play with the controls until you can characterize the emergent effects of manipulating only one control. For example, the sensor distance _tends to_ act a bit like a "zoom" control, where the tendril structures become larger or smaller depending on sensor distance.

However, notice also that there are a lot of dynamics at play. For example, if sensor distance is changed quickly, it will take more time for a larger structure to appear, if at all. Try to characterize the interplay between initial states and control settings.

### Design an Experiment
Although physarum is beautiful, it is also important to determine how we can characterize the emergent structures. Design an experiment to characterize the emergent structures and phase transitions as you play with the control parameters.

For example, clearly some control settings make the physarum look like a [visual version](https://en.wikipedia.org/wiki/White_noise) of [white noise](https://processing.org/reference/libraries/sound/WhiteNoise.html). Some control settings, however, allow for structures to appear. We can call the transition between white noise and a structure a phase transition.

Think about the following points:
- **Search**: How can we systematically search the control state space, yet not have an experiment that has a factorial explosion?
- **Sample**: How can we strategically sample the simulation? E.g., do we take photos? Videos? Other characteristics that need to be captured?
- **Measure**: How can we characterize the samples? Do we add up pixel brightness? What metrics are possible?

---
## On your own
This activity helps us to understand how to design and study the behaviour of swarms. However, the difficulty is in how to translate intelligence from the behaviour of particle-like agents to their emergent super-structures. On your own, think through ways that we could characterize intelligent behaviour at a super-structure level: what would it look like for a swarm-level emergent super-structure to have a goal and make a good or bad decision?

---
## Philosophical Connection
The central idea we explore with swarms is how complex organization can come from simple "rules." However, even our own simulations do not demonstrate the direct causal chain between something demonstrably unintelligent like generalizations of Conway's Game of Life, to something that "looks" intelligent and life-life like physarum simulations. This helps us understand the difference between aliveness and intelligence. If we allow that some definitions of life can include Game of Life agents because they technically reproduce (a dubious claim, I know), what is the dividing line between a simulated agent that is alive vs. alive and intelligent? Do there have to be real life and death "stakes" to be alive and intelligent?