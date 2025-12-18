---
title: Lab 06. Detecting walls
draft: true
---

As we saw in class, you can design an excellent robot that solves mazes using only a very simple emergent algorithm. For some of you, this will be enough to get you through the end of the tournament. Never abandon the simple solution! Particularly as a fallback.

However, today we will learn a slightly more complicated wall-following algorithm. Instead of simply following the wall with a PID-like algorithm, we're going to try to predict when a corner is coming up. You will have to create a careful experimental setup to be able to capture sensor data accurately.

To be able to make the prediction, we'll use [Bayes Theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem). Instead of relying on a straightforward measurement, we'll be making a guess about the likelihood that we're coming up on a corner. Then, our decision-making algorithm will use the probability as a threshold for a decision.

---
## Pre-lab
- Review probability from lecture
- Review Bayes theorem from lecture
- Review lecture notes on the lab from Tuesday


---
## Project kickoff
Before the lab begins, we are going to do kickoff session for the personal project. Your TA will introduce some potential project ideas. 

### 1. Brainstorm ideas
Spend five minutes brainstorming possible project ideas. You do not have to commit to any of the ideas yet, this is just a way to make sure that everyone has a variety of ideas to choose from.

Do your best to get away from project ideas that are recreations of the lab robot. 

### 2. Do an initial sketch
Choose an idea from the brainstorm, or from an idea that you already have. Create a brief sketch of how it might work. Be ready to briefly explain it to a TA.

### 3. Write a one-liner
Describe your project in a sentence (or two). Your TA will will come ask for your one-liner and sketch. Both of these are works in progress: you're not committing to them for the project, but instead using this as an opportunity to work out an idea.

### 4. Make a sketch, write a pitch, and a budget (homework)
Next week, bring in a 1-2 paragraph description of your project idea along with a well-developed sketch. Your sketch can be 2D or 3D. It can be one good drawing, or a few sketchy drawings put together. The budget should be a complete budget that includes a full bill of materials and not exceed $50. Include absolutely everything you'll need for the project as you've sketched it.

You shouldn't spend more than an hour or two on this in total. The idea is not to have a completed project before you complete the project, the point is to be able to have a realistic conversation about your project as soon as next week.


---
## Lab
This lab will require making a lot of measurements and an experimental setup. You'll want to document as much of your process as possible. If you haven't developed a good logging system for your robot yet, this lab would be the perfect opportunity to perfect it.

Before beginning, remind yourself of Bayes Theorem.

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

You may want to rewrite the equation to be more descriptive of the problem you're trying to solve:

$$
P(Corner \mid Sensor) = \frac{P(S \mid C) \cdot P(C)}{P(S)}
$$

### 1. Determine $P(Sensor)$ and $P(Corner)$ analytically
Before starting your experiment, just using your model and reason, you can work out both the $P(Sensor)$ and $P(Corner)$ terms of the equation. Of course, you could also determine these terms experimentally, but it's worthwhile trying to understand them analytically first.

$P(Sensor)$ refers to the probability that the sensor has any particular reading, i.e., you're looking at sensor resolution. You can read a [helpful datasheet](https://handsontec.com/dataspecs/sensor/SR-04-Ultrasonic.pdf) to get the range, but you know from your own experience that the sensor is accurate within a range of about `2cm` to `100cm`. If you choose to split that range into `1cm` blocks, then $P(Sensor = x)$ for any $2 < x < 100$ is $1/98$. Why? You've got $98$ possible centimeters between $2$ and $100$.

However, maybe you care about a range of positions, such as `5cm` $+/-$ `1cm`, so you have to do $P(Sensor = 4 \cup Sensor = 5 \cup Sensor = 6)$. Luckily, that's just $P(Sensor = 4) + P(Sensor = 5) + P(Sensor = 6) = 3/98.$ 

If you have two sensors, then you need to do $P(SensorA = x, SensorB = y)$. You can do this by listing all the possibilities in pairs, i.e., $(x=2, y=2), (x=3, y=2) ... (x=100, y=100)$. There should be $98 x 98$ possibilities. Which ones do you care about?

Note that, below a certain threshold, the discretization of the sensor range doesn't impact the final result very much. If you choose to go with `0.1cm` blocks, your final fraction will be the same. If you go with `10cm` blocks, you'll lose a point of precision. Does it matter?

Now do the same for $P(Corner)$. This is all about spatial resolution. How many positions can your robot possibily occupy? You'll have to make a choice about discretization again.


### 2. Perform live predictions (homework)
Now that you've got your probabilities, you can now predict whether or not your robot is in the corner while the robot is driving live. However, you may find that the experimental reality differs from your analysis, and you're getting incorrect predictions.

If that's the case, place your robot down against a real wall with a real corner. You can make one out of cardboard or some books if you want. Take measurements from your sensors and label them as being either in the corner, or not in the corner. Make sure to capture the edge cases, e.g., your robot being accidentally rotated.

After you've captured your data, calculate $P(Sensor | Corner)$. If it doesn't make sense analytically, try to figure out what the problem was and redo your experiment.

Drive your robot along the wall, either using remote-control, or autonomous navigation. How accurate is your model? If it's inaccurate, why is it inaccurate? How can you improve your model? Create a demonstration and post a video on Piazza before next lab.

To be clear, your model does not need 100% accuracy to be complete. No robot ever has it, and there are other signal-processing techniques that we haven't learned yet to deal with repeated dependent predictions.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.
