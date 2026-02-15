---
sidebar_position: 1
slug: /assignments/project
---

# Electronics Project overview
The final assessment of your individual abilities in this course will be the personal electronics project. The project must be done individually because it is an individual assessment, but you are certainly encouraged to discuss the work with your classmates. This is your chance to demonstrate your engagement and mastery over the course subject matter. It is an open-ended creative project, but it must include at minimum:

1. An operating Arduino R4 and working circuit
2. A mechatronic system that both senses and actuates (or displays via the microcontroller)
3. An intelligent decision-making system of some sort
4. A conceptually-rigorous illustration and/or demonstration of a core course concept

We will guide you towards developing this idea in class, during labs, and in one-on-one meetings. Although we are assessing your abilities, the final execution of the project will not be the most important part. Instead, making consistent and well-documented progress will be the core of the assessment.

## Project Components
### Sketchbook
You are required to document your project progress in your sketchbook. You should clearly label your early sketches, ideas, designs, inspirations, etc., as well as your circuit diagrams, final sketches, and final project documentation. You will be marked on the quality and clarity of presentation for anything you indicate is part of your final documentation, but the rest of the sketchbook will not be assessed for quality, since it's just for sketches.

### Sketchbook meeting
At some point after the first two weeks and before the last two weeks of class, you will be required to have a one-on-one meeting with a member of the teaching staff about your final project idea. You will bring your sketchbook and discuss the development of your idea, and your general course engagement with the teaching staff member. You are required to meet with the teaching staff member to receive your sketchbook grade.

### Initial Pitch and Sketches
By about one month into the course, you will be required to hand in a pitch for your project that includes a written description and one or more sketches. You will receive written feedback on your pitch. The point of this is to scope your project appropriately to the course. Remember, your eventual budget should be under $50.

### Demo Day: Paper Prototype and BOM
In Lab 06, you will be required to bring a paper prototype of your project into lab for demonstration and critique. No electronics needed for this prototype, but it should be well thought out. You will include a bill of materials and ensure that the budget is indeed below $50. This is the parts ordering deadline.

### Demo Day: Works-like prototype
In Lab 10, you will be required to bring a functional prototype of your project into lab for demonstration and critique. The project should mostly "work" in terms of the electronics.

### Final Showcase
On the last day of class, you will show off your fully-working final project. Be prepared to explain the concept of your project, demonstrate how it works, and answer questions people may have.

### Final Sketchbook and Documentation Handin
You will be required to hand in your sketchbook and final project documentation, including a short written description of the concept and execution, a circuit diagram, and drawings and design diagrams needed to understand the functionality of the project, and a video that demonstrates the working product.

## Potential Project Directions
Again, you are encouraged to take this project and run wild with it. There are many, many potential directions that you can take it. The below ideas are given as jumping off points, including a templates for your pitch, timeline and budget. Any idea you pitch should be unique and developed mostly on your own, but feel free to talk to others to brainstorm ideas.

### Human Biosensing
There are many interesting biosensors that can be used with Arduino, including skin conductance, muscle activation, heart rate, and more. A human biosensing project would include using one or more sensors to sense some signal from the human body and then actuate or display something based on the signal. Potential applications range from sports science, to sleep monitoring, to emotion regulation, and more.

#### Pitch: Videogame LED Heart Monitor
When people play videogames, they go through waves of emotional distress and relaxation. These changes in emotion are reflected in measures such as heart rate (HR) and heart rate variability (HRV). The more stressed someone is, the faster their heart may race, and also, the less their heart rate varies. 

For this project, I will use a blood pulse oximeter (BPO) to measure a person's HR and HRV. The BPO will be attached to their earlobe while they play a stressful videogame. The BPO will be attached to an Arduino which will measure their HR/HRV. The Arduino will also be attached to a small multicolour LED matrix housed inside a white plastic heart. The LED matrix will pulse at the same rate as their heart, and change colours according to their HRV. 

The purpose of this project will be to externalize someone's internal emotional state when they may not be attending to it. By having an external reminder of their emotional state, they may be able to notice that they are stressed and perform relaxation techniques. Or, they may want to increase the difficulty if they notice that they are not being stimulated enough.

The connection to COGS 300 is that the project connects human subjectivity and cognition to computer modelling by literally connecting affect-related biosignals to an electronic system. The project assumes that a simple computer model of emotion can represent human experience well enough to stage an intervention. The heart LED matrix display is a model of human emotion, albeit a rough one. Whether it can truly help someone delve deeper into their own emotional experience remains to be seen.

#### Budget
- Pulse and Heart Rate sensor: $13.98
- RGB LED matrix: $11.41
- USB-C Cable: $3.50
- Jumper wires: $10.50
- White plastic heart: $0.00 (sewing out of scrap linen)
TOTAL: $39.39

#### Timeline (Term 1)
- Sep 18: Order parts
- Sep 25: Parts expected to be delivered
- Sep 30: Initial heart rate visualization developed in Processing
- Oct 15: LED matrix testing and circuit construction
- Nov 01: Heart sewn
- Nov 05: Demo day - initial HR pulse visualization on matrix and HR signal shown in Processing
- Nov 15: HRV calcuations implemented in Arduino and visualized in Processing
- Dec 01: Documentation and video made
- Dec 04: Showcase with working project
- Dec 15: Final documentation deadline

#### Timeline (Term 2)
- Jan 28: Initial Pitch and Sketches
- Feb 11: Order parts and Paper Prototype made
- Feb 20: Parts expected to be delivered
- Feb 23: Book sketchbook meeting with TA or Paul
- Feb 27: Initial heart rate visualization developed in Processing
- Mar 10: LED matrix testing and circuit construction
- Mar 14: Sketchbook meeting completed
- Mar 17: Heart sewn
- Mar 18-23: Works Like Prototype - initial HR pulse visualization on matrix and HR signal shown in Processing
- Mar 30: HRV calculations implemented in Arduino and visualized in Processing
- Apr 6: Documentation finished and video made (recommended deadline)
- Apr 9: Final Showcase with working project + Final documentation deadline


### Product Design
Many interesting products can be prototyped with Arduino, from automatic fish feeders, to unique musical instruments, to vibration-based notifaction systems. A product design project would involve making an electronic and/or IoT device that meets a human need with the premise that it could be sold or distributed.

### Scientific Instrument
Arduino can be used in the sciences to create devices for data collection from weather stations, to animal monitoring systems, to museum display engagement sensing. A scientific instrument project would involve making a device that advances a scientific goal such as measurement or experimental control.

### Engineering model
Engineers and architects sometimes make small models of larger systems that they're interested in building such as model airplanes, model water systems, model buildings, or even just something that demonstrates an engineering or scientific principle (such as Bernoulli's principle). An engineering model project would involve designing a model version of something to demonstrate a principle or method of design.

### Artistic project
Arduino is used widely in artistic and hobby projects such as actuated cosplay costumes, sculptures, and performances. A artistic project can involve so many different things that it's hard to define for a write-up, but would be evaluated on aesthetic and/or conceptual merit.