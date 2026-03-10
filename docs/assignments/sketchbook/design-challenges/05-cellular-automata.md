---
draft: false
---

# Design Your Own Cellular Automata

For this design challenge, you're being asked to design your own cellular automata system based off of Conway's Game of Life. It must be different than existing sytems that we studied in class such as Langton's Ant, Conway's Game of Life, SmoothLife, or similar derrivatives, but can be heavily inspired by them.

There are many good options to extend one of these systems. You can think about the grid system and use different shapes, the substrate on which the grid acts and see whether that changes the logic (like what happens if GoL lives on a donut vs. an infinite plane), the dimensionality (3D GoL?), the kinds of rules that are applied, or much more.

The one rule is that the system must be truly _cellular_. That is, the system must operate on a "grid" of some kind where each cell reacts to its neighbours (defined in the topologically most broad sense, i.e., a neighbour is simply a cell that you can travel directly to), rather than there being an "agent" that has goal-directed behaviour of any kind. If an agent emerges from the cells, it must be a happy and expected behaviour of the system, but it cannot be that there is an intention "programmed" into the agent.

The system must perform some kind of emergent behaviour based _only_ on the transition rules. That is, there must be no magic foresight or long-distance seeing, or pre-planned outcome. If you are designing a system to, say, draw a triangle, there must be no high-level encoding of a triangle, the triangle must grow out of transition rules.

Clearly define your topology (cells, substrate), states, transition rules, demonstrate/simulate the major emergent behaviours of your system, and characterize the behaviours in plain English. Draw and annotate your system. If you use a computer simulation, post a clip of the emergent behaviour on Piazza.

---

## Design solution format and handin
To demonstrate your system, draw and annotate the following system components:
- The grid: what defines a cell?
- The substrate: what does the cell "live on"?
- The state: each cell's possible state
- The transition rule: what makes cells change state?

Then "simulate" your agent on paper until you can detect an emergent pattern. Characterize at least three key emergent patterns (i.e. species) for your system.

If you would like to do a computer simulation, that is acceptable, but not required. If you choose to do that, still make a drawing for your sketchbook, but also post a video to Piazza, and say you did in your sketchbook.

Each design solution, including this one, should include **two** short reflections and self-provided grades in the range of 0-5. Yoru final design and relfections should be in your sketchbook. The reflection grades must be very clearly marked (highlighted, circled, at the top of the page, something), or we will count it as zero. You will submit a photo of the final design and reflections to Canvas.

The first reflection and self-provided grade should assess your design challenge: how well did you think that you did the design challenge? Provide a short justification for your self-given grade and reflect on the connection between the design challenge and course concepts.

The second reflection and self-provided grade should assess your participation in the course: over the module, did you fully engage in the pre-readings? Did you do the in-class drawing exercises and design challenges to the best of your ability? Provide a short justification and reflect on your changing understanding of COGS as a result of the module.

The best reflections do not linger long on self-promotion. Instead, they focus on course concepts. Use this first design challenge as a practice run.

For this course, we always use the following kind of scale:
- 5: Exceptional: above and beyond requirements, brings in outside knowledge and/or deeply engages with the material.
- 4: Very good: meets requirements fully, no major critiques.
- 3: Good: mostly meets requirements, one or two major critiques or many minor critiques.
- 2: Poor: mostly pro forma meeting of requirements, many major or minor critiques.
- 1: Very poor: some discernable effort, but significant problems.
- 0: No discernable effort.

You will notice that "fully meeting requirements" is only a 4/5, or 80%. This is unusual for many people, but is standard in art and design courses. The secret requirement is that you must go above and beyond to get above 80%. The point is to get you to creatively engage with the course. If we fully specify what it takes to get 100%, then there will be no creative component. Part of the purpose of engaging with this in this manner is to teach you to assess yourself in your own creativity. Then, we will assess you on your self-assessment. Don't worry, this will seem natural soon enough.

The design challenge is due two weeks after the assignment released (will be indicated on Canvas).