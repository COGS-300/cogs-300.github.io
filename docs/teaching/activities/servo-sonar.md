---
draft: true
---

import Image from '@theme/IdealImage';

# Servo Sonar

## Introduction
In this activity, we'll be designing and prototyping a sonar device using the ultrasonic sensor and a servo. The purpose of this is to introduce grounded sensing. Eventually, we can apply a Bayes Filter to this as well, but for now, we'll just build the sonar device.

### Materials
- Paper and pens
- Ultrasonic sensor
- Servo
- Elastic bands
- Breadboard and jumper cables

---
## Activity
The basic idea will be to build up depth map of the robot's surroundings. The depth map is basically an "image" of the distance between your robot and the objects within the range of the ultrasonic sensor. 


### Create a depth map using just paper
To start, imagine that you've got a working ultrasonic sensor on a piece of paper. Mark where the ultrasonic sensor is. Draw or place objects for the ultrasonic sensor to which to measure distance.

Draw a small half-circle around the center of your ultrasonic. This will represent the angular range of your sonar (`180°` for the servo). Divide the half-circle in half a number of times to create the angular divisions that your depth map will cover. For example, you could use a very rough depth map split into `45°` chunks, which, for a `180°` servo, means you would have a map length of `4`.

For each division of the half-circle, measure the distance from the center of the half-circle to whatever object is the sector inscribed by its left and right bounds. We suggest going through the center of each sector to simulate the range of the sonar. Write down the list of distances. This is your depth map where the index of the list (starting from 0) corresponds to multiples of the division size in angles. E.g.:

```cpp
angles[0] = 0  //  22.5° =    (0° + 45°) / 2 = middle of the first sector
angles[1] = 5  //  67.5° =  22.5° + 45° = middle of the second sector
angles[2] = 7  // 112.5° =  67.5° + 45° = middle of the third sector
angles[3] = 3  // 155.5° = 112.5° + 45° = middle of the fourth sector
```


### Measure the size of objects using your paper depth map
Find two objects: (1) smaller than the span of a single sector; and (2) larger than the span of a single sector. Figure out how to measure the size of each of these objects using the depth map. Include estimates of the error involved in each measurement. Figure out what the edge cases are. 

Try to model real life as much as possible. When would a depth map be used by a robot? Think about walls with corners, circular objects, legs of chairs and other challenging geometries. How can a depth map identify the boundaries of these objects? What are the limitations?


### Design and build a electronic sonar
Using the ultrasonic sensor and a servo, design and build an electronic version of your depth map. Start by simply ensuring that it can build the map by turning and taking measurements accurately. How can you evaluate whether your depth map is working?

Come up with ways to determine the angle towards the center of the object you're interested in measuring. Imagine that you are making a robot that needs to steer towards the center (because this will happen in lab soon enough). 


### Design a Bayes Filter for a depth map
Now, we can see the power of the Bayes Filter process in action. An obvious solution to driving towards the center of an important object would be to orient your robot to the angle of the closest object. However, there is uncertainty in your measurements. Particularly with a moving robot, it's easy to steer off course. 

The solution is to treat every measurement as a probability rather than a certainty. You then end up with two maps: the depth map, and a probability map. Rather than steering towards the closest object, instead, steer towards the highest probability.

Work out a design for this using the Bayes Filter we discussed in class. Extend it to 360° to make a map of your environment from the perspective of the robot.


---
## On your own
The Bayes Filter is a versatile method of determining the state of a robot, but it can be applied to many different situations where a state estimation is needed. You do not need spatial or even quantitative data to estimate and update a probability distribution.

To solidify your understanding of the technique, start with numerial state estimations that are spatial, but not the same object-detection format that we have used in class. For example, think about estimating the state of a car's velocity, steering wheel angle, or other similar kinematics. Then, move onto state estimations that are non-kinematic but still numeric physical quantities. For example, temperature readings, rainfall measurements, or YouTube views. Then, finally, try estimating categorical states for systems and populations such as on/off, good/bad, happy/unhappy, etc. 


---
## Philosophical Connection
The Bayes Filter again calls into question the realism of probability estimations and models. When tied to a state estimation like a robot position, we take for granted the veracity of a real, objective, quantifiable thing that we're measuring. However, there are some things that can be said to be "states" that seem describable as states, but are actually quite difficult to fully represent. 

For example, "brain states" and "neuron activations" are commonly talked about in psychology, but the reality of FMRI studies is that the highest resolution brain scans can only give us the spatial resolution of 10s of thousands of neurons, and then only being able to measure blood flow, not actual neuron activation. Many people claim that we can "read minds" with models of neuron activation. But how much is measuring reality, and how much is an artifact of imposing a model on reality?

Can we differentiate our models from the things that the models measure? Why or why not?