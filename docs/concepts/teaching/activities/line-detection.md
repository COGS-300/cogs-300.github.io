# Line Detection Decision Trees
## Introduction
Sometimes we want to make definitive categorical determinations from our sensor data. For this course, we're going to use line detection as a test case. However, the techniques we'll learn here generalize to machine learning for any categorical determination. Today, we'll hand-build decision trees to navigate mazes. Later, we'll learn how to build classifiers using many observations from sensor data.

### Materials
- Paper
- Photo cell
- IR Sensor

---
## Activity
### Build a paper robot line detector
Draw a line on a piece of paper. On a second piece of paper, your "robot", poke a hole through the paper. This hole will be your robot's "sensor". The line should be at least as large as the hole for your sensor.

When the hole is overtop of a blank piece of paper, we'll say that the sensor returns a reading of `100%` white (or `0%` black, whatever works better for you). When the hole is on the edge of the line, it returns a percentage based on the amount of line that is under it, from nearly `100%` white to nearly `0%` white. When it is fully over a line, it returns `0%` white.

Come up with a line-following algorithm for your paper robot. How do you detect whether or not you're on the line? Can you follow a line with just one sensor? What else might you need?


### Make a paper maze-solving robot
Now that we've got the simplest toy example running, make a more complex maze, and design a maze-solving algorithm. Do you need to add more sensors? Is there a limit to the number of sensors that you need, or is more always better?

As you design your maze-solving algorithm and change the number of sensors, introduce more difficult situations for your algorithm to solve. Can you detect corners? Can you differentiate right vs. left corners? What happens if the robot drives off the line accidentally? 

Making a robust maze-solving algorithm is difficult, and even more so when you implement it in a real robot. You may not figure out all of the edge cases today.


### Make a decision tree from your algorithm
Now that you've settled on a sensor configuration and algorithm, formalize your algorithm as a decision tree. Although it's tempting to be hand-wavy, use concrete numbers and sensor sources to define your tree. 

The tree should be defined so as to categorize states, not robot actions. You might choose to take particular actions as the result of these states, but the key is to outline the necessary sensor readings, action histories, and other information sources you might need to properly estimate state.

Note that you do NOT need to include Bayes Filtering in this decision tree. You can chain these techniques together for your own lab-based robot, but in lecture, we'll just do one at a time.


---
## On your own
Decision trees are an excellent way to formalize a decision-making process, they are the foundation of some simple machine learning models, and are a good way to learn about machine learning in general. As we learn about classifiers, you should be thinking about something like a decision tree under the hood.

The problem with decision trees is that they are not very robust to error, context, or history. Data has to be numeric or categorical. The decision trees can't spawn processes, go in loops, or do other common things we think about with general purpose computing. Instead it's like taking one big snapshot of data at a time and feeding it into a model.

Try making decision trees to classify states from things in your own life. Explore the limitations of decision trees as state classifiers. 


---
## Philosophical Connection
As it says above, decision trees are great but have limitations. As we learn about more complex classifiers, we'll see that, although we can formalize decision-making processes with models like decision trees, they don't really model human cognition that well. They don't even really model human cognitive classifiers that well, like when we visually distinguish between letters or animals.

This starts to get at one of the fundamental debates in the philosophy of cognition: [connectionism vs. symbolism](https://en.wikipedia.org/wiki/Connectionism#Symbolism_vs._connectionism_debate). 