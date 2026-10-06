---
description: Designing an Ultrasonic Object Detector
draft: false
---

import Image from '@theme/IdealImage';

# Ultrasonic Sensors 

## Introduction
Ultrasonics are a good first long-range distance sensor. They demonstrate the limitations of all sensors in that they have a clear range of effectiveness, suffer from noise interference, take a certain amount of time to work, and have a wide enough beam that you can sort of "feel it out." Although you can indeed get higher-precision sensors, more precise sensors have the exact same problems, just with smaller error in one or more of the aforementioned limitations.

### Materials
- Ultrasonic sensor
- Arduino
- Jumper cables
- [Ultrasonic Arduino Sketch and Wiring](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics?sharecode=EYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg).

---
## Activity
There are a few important steps to getting a good reading from a sensor. This activity will bring you through those steps, and then you will design something with an ultrasonic. The instructor will tell you when to move to the next step.

### 1. Wire your Ultrasonic and take your first readings
Using the diagram and code from here: [Ultrasonic Arduino Sketch and Wiring](https://www.tinkercad.com/things/0ZcVbvEtyh1-ultrasonic-basics?sharecode=EYkwNC3pRK0EH-b4Xe3xGWELpxXgU3D0wV2ezMiLibg), create the ultrasonic circuit. Draw the different pins and write down which pieces of code control them, and what they do. Print the ultrasonic values to the screen.

### 2. Make your first average filter
A filter is a good way to start to deal with noise. Since an ultrasonic signal will fluctuate, create a basic average filter by storing the `current` value and the `last` value of the ultrasonic, then averaging them by `(current + last) / 2). 


### 3. Extend the averaging filter window
Using an array, store the last five values. You can declare an array of zeroes like this:

```cpp
float distances[5]={};
```

Now, you have to store the "last" value a bit differently. You can choose to shift the whole array down when a new value arrives:

```cpp
// this shifts everything
for (int i = 4; i > 0; i--) {
  distances[i] = distances[i - 1];
}
distances[0] = current;
```

If that gets to be too slow for longer windows, just track the current index:


```cpp
int nextIndex = 0; // declare once, outside the update loop

// each time a new value arrives:
distances[nextIndex] = current;
nextIndex = (nextIndex + 1) % 5;
```

Now average across the whole window:

```cpp
float sum = 0.0f;
for (int i = 0; i < 5; i++) {
  sum += distances[i];
}
float average = sum / 5;
```

### 4. Design your filter: what is most important?
You can design a filter in a lot of different ways. For example, what else, other than an `average` might be a good method of deciding what the "real" distance currently is? Can you think of other statistical techniques that might be helpful? Think about these filter dimensions:
- Length: how many values help you get the right picture?
- Weight: which values are the most important, and how do you emphasize them?
- Measure: which measure of statistifcal tendency is most effective?
- Procedure: what other helpful information can you include either from the robot or the environment to improve your readings?


### 5. Design a distance-sensing light switch
Some [light switches](https://leviton.com/products/ossmd-gag) use ultrasonic sensors for detecting whether someone is present in a room. Design a light switch that uses an ultrasonic and a filter to decide whether a light should be on or off. Model the light with an LED. Use a button to simulate the switch. Use any other electronic items we have taught you about or any mechanics that you have used in lab. Follow the standard design process, but do it quickly:
- Moodboard
- Initial sketches
- Looks-like/works-like prototypes
- Storyboard/interaction design

You should be able to do this is less than 15 mins. The key is to make decisions quickly using many quickly-made prototypes, rather than to pre-plan every detail. Prototype, prototype, prototype.


## Philosophical Connection
Filters make us question ontology. That is, we only seem to be able to measure things and be convinced of their accuracy though repeated samples. Yet, our claim about what is truth is entirely virtual, i.e., the average doesn't usually "exist" in our data, it's a result of a process that we use to make a rhetorical claim about a likely outcome. So, is an average "real" or is it a useful fiction?