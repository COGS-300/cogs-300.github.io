---
draft: false
---

# Security in the Distributed Kingdom
As we learned in class, the Distributed Kingdom is an exercise that narrativises the problems of message-passing between agents. The point isn't the narrative, but the underlying logic of message-passing that it exposes. As a brief reminder:

The Distributed Kingdom lies on an isthmus between a Northern kingdom, a Southern kingdom, the sea of the West and the sea of the East. The kingdom is large, as large as British Columbia, and has just as much varied geography: mountains, valleys, forests, lakes, rivers, etc. The King needs to get messages out to his people when they need to defend the kingdom from invaders from the North, South, East, or West. The messages need to be delivered as quickly and efficiently as possible. No magic is allowed, and all technology must fit within an early medieval setting, e.g., some metalurgy is possible but nobody has invented clocks, precision industrial manufacturing, or automation yet.

The in-class exercise was to find a reliable way to pass these simple messages along, to figure out their limitations, and to design encodings and protocols to ensure messages were passed consistently and accurately.

For this exercise, we will introduce the problem of spies. This will be a model of the problem of having incorrect and private information in a distributed system. Using only the same medieval technology, how do we solve the following problems:
1. Some information should remain private, yet be transmitted quickly.
2. Some information may be incorrect or malicious, and should be ignored.

A good solution will include a full description of the message-passing systems, a full description of their limitations, and a good enough description of encodings and protocols such that problems, issues, and errors can arise. There are no perfect systems: no magical or hopeful thinking.

---
## Design solution format and handin

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