---
description: Creating a servo
draft: true
---

import Image from '@theme/IdealImage';

# Do-It-Yourself Servo

## Introduction
Now that you understand how to [use a servo](/teaching/activities/servo), you may want to understand how they work. As you saw in class, the inside of a servo consists of a DC motor, a series of gears, a rotational encoder, and a control board. We're going to break that out into large scale so that you can understand each component on its own.

### Materials
- Rubber bands
- Cogs, gears, and wheels
- 3mm Barbeque skewer or similar sized stick
- Potentially the equivalent of abovein Lego

---
## Activity
### Create a direct-drive rotational encoder
Create a rotational encoder by attaching a BBQ skewer to a potentiometer knob with a rubber band. Figure out a way to measure the amount of rotation of the skewer using the knob. You may need to perform an experiment, e.g., try a certain number of turns of the skewer and see how far the knob turns.

### Create a drive train
To increase both the precision and the amount of force that the model servo can output, let's introduce a drive train. Using a series of gears or pulleys with rubber bands, make it so that many turns of the BBQ skewer results in only a small amount of movement of the potentiometer knob. Figure out the new ratio of number of turns of the BBQ skewer to angle of the potentiometer knob.

### Simulate a control algorithm
Come up with an algorithm that will determine the BBQ skewer movement. Choose a target angle to turn the knob to. Then turn the BBQ skewer either forwards or backwards. Try to be as precise as possible: if the potentiometer is close to the target angle, should you spin the BBQ skewer slower or faster? Put this behaviour into your algorithm.

---
## On your own
### Create an electronic version of the DIY Servo
The DIY servo is a large physical model of a real, working servo. But, it doesn't have any electronics. You can replace your finger turning the BBQ skewer with a real DC motor. Adjust the drive train so that the DC motor can freely turn, but still handle the force of turning the knob. Implement your control algorithm.

---
## Philosophical Connection
A real servo is just the eletronic DIY servo, but in a more highly-engineered little package. There's a phenomenological and functional difference between the DIY servo and the manufactured servo, but is there a categorical difference? Often, we assume that categorical similarity is total equivalence, but clearly your DIY servo is not functionally equivalent to a manufactured servo. 

This matters when we talk about the difference between models, theories, and categories. Try to imagine a servo built out of entirely different parts. For example, using only soft components, or using pneumatics to drive the motors. Is it still a servo? When does that matter? Similarly, if you can build a servo out of an Arduino, but an Arduino is much more powerful than a servo, is it "just" a servo when it's acting as one?