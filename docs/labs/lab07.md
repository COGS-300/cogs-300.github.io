---
title: Lab 07. Bayes Filter and Project Planning
draft: false
---

For this lab, we are performing object detection using a Bayes Filter. The purpose of this is to be able to move our robot towards an object. You will need to do this in the final tournament, where you will have to find and touch a goal object with your robot.

The basic conceptual idea is to scan using an ultrasonic sensor and a servo. We can map the angle of the servo to the distance from an object. Then, we can rotate the robot so that it is facing towards the angle that has the lowest value. Then, we can move the robot forwards at that angle, and restart the process.

This is likely to be an error-prone operation, so we can apply all of our signal processing and probability-based techniques to get good data.

---
## Pre-lab
- Remind yourself of the [Bayes Filter lesson](/teaching/lessons/bayes-filter)

---
## Project Planning
Today, we will do some project planning before the robot tournament lab content. From last week, you should have a paragraph-long project pitch, an initial sketch, and a budget (an itemized bill of materials and costs). Today, we'll discuss your project ideas and develop a project timeline.

### Break your project into milestones
Your next big deadline will be the paper prototype due in Lab 10. After that, you have a final demo day in lecture on the last day of class. Between now and then, you'll need to get a project finished.

Breaking your project down into milestones is the best way to test feasibility. Using the exact same techniques as Lab 02, you should be making:

- One or more works-like prototypes
- One or more looks-like prototypes
- Prototypes that combine works-like and looks-like

You will likely need multiple prototypes and sketches to work out the final prototype of your idea. We are only "requiring" one paper prototype for Lab 10, but you will do yourself a favour if you manage the project by making multiple prototypes for multiple milestones.

Now, break your project down into managable chunks. As yourself:
- What question am I answering with this prototype?
- What's the minimum amount of work I can get away with to answer this question?
- What happens if that fails?

For example, if you want to make a big, complex cosplay actuated robot costume with flapping wings and a flame-thrower, you could break it down into:
- Wings
- Flame thrower

Then you could ask, what's the easiest way to prototype a wing?
- A servo motor
- A piece of cardboard

Then you could ask, what's the easiest way to prototype a flame thrower?
- A match
- Some gasoline in a balloon

And when you inevitably burn yourself with the gas-filled balloon, you realize that you might have overshot your idea, and decide not to do the flame thrower. However, the servo and cardboard went great, so you decide to make the next smallest prototype: a wing with two degrees of freedom. Then you build a prototype with two servos. 

And so on.

:::warning
Don't make a flame thrower.
:::

### Figure out failure pathways
Once you've got your milestones in place, you need to estimate how realistic they are, and what you'll do when you fail. 

In the above flame thrower example, you might need a less explosive version. For example, you may decide that a water thrower is just fine for a project, and that the same pump you would have bought for the gasoline would work just fine for water.

Even for less-ambitious projects, it's best to have backup plans. Build these into your milestones.

### What to keep and hand in
All of this should be recorded in your sketchbook to some degree so that you can track your progress and have a conversation with teaching staff during the sketchbook meeting. As your ideas progress, add to your sketchbook. This is a creative project, so we expect your ideas to change, mature, and develop.

However, just to ensure that everyone is on the same timeline, we will require the following handins:
- Pitch, budget, timeline: hand in as a PDF for next lab
- Sketches and other creative work: keep in your sketchbook and show to teaching staff during your sketchbook review
- Prototypes: refer to in your sketchbook, keep somewhere safe, show during Lab 10 and Demo Day on last day of class

--- 
## Lab

### 1. Implement a sweep on your robot
You have at least two options for sweeping on your robot: (1) Attaching something like an ultrasonic sonar tower with a servo to the robot; or (2) using the robot to sweep by turning the whole robot with a fixed ultrasonic sensor. There are advantages and disadvantages to both, and we've seen both be sucessful in the final tournament.

Experiment with sweeping in both ways. Once you've made a decision, write a sweep routine for the robot. Find a way to visualize the object's direction.

:::warning
Test before making any permanent changes to your robot.
:::

### 2. Use the Bayes Filter on your sweep array
Set up an array that relates the position of your robot (or sonar tower) to the location of an object you're trying to detect by doing the following:

- Every index of the array corresponds to a direction that the robot is facing
- The contents of each array position is the probability that the robot is in that direction
- Initialize the contents to be in terms of your discretization

For example, if you use a 45° discretization, it might look like this:

| Index   | Degrees  | Probability |
|---------|----------|-------------|
| 0       | 0        | 1/8         |
| 1       | 45       | 1/8         |
| 2       | 90       | 1/8         |
| 3       | 135      | 1/8         |
| 4       | 180      | 1/8         |
| 5       | 225      | 1/8         |
| 6       | 270      | 1/8         |
| 7       | 315      | 1/8         |

So your current probability array would look like:

```cpp
double arr[8] = {0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125};
```

Then, update your probabilities according to your measurements. Example code is available in the [Bayes Filter lesson](/teaching/lessons/bayes-filter). One method could be to do the following:
- Sweep to find the distances to the closest object
- Normalize the distances by dividing each by the maximum distance (converts each to 0-1 range)
- Convert minimum distance to maximum likelihood by using [1 - normalizedDistance]
- Multiply each item in the maximum likelihood array by the current probability array
- Take the maximum probability to be the likely direction of the robot
- Renormalize the items in your current probability array so they all add up to 1
- Iterate

### 3. Perform live object tracking (homework)
Come up with a demonstration of your object-tracking system working on your autonomous robot. It does not have to be perfect, but it should be able to reasonably accurately deterine the direction of the object. It's not required to use a Bayes filter for what you hand in next week, but it will likely help to think probabilistically.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.