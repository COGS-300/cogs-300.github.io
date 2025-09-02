---
title: Lab 06. Detecting walls
draft: true
---

As we saw in class, you can design an excellent robot that solves mazes using only a very simple emergent algorithm. For some of you, this will be enough to get you through the end of the tournament. Never abandon the simple solution! Particularly as a fallback.

However, today we will learn a slightly more complicated wall-following algorithm. Instead of simply following the wall with a PID-like algorithm, we're going to try to predict when a corner is coming up. You will have to create a careful experimental setup to be able to capture sensor data accurately.

To be able to make the prediction, we'll use [Bayes Theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem). Instead of relying on a straightforward measurement, we'll be making a guess about the likelihood that we're coming up on a corner. Then, our decision-making algorithm will use the probability as a threshold for a decision.

---
## Pre-lab
- Bayes theorem
- Bayes filter
- Decision-making in robotics

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


### 1. Model your experiment
Create the simplest possible model of your experiment using cardboard, lego, or any other materials. Visualize the cases that you want to predict. Start with something obvious like an inside corner. 

The goal will be to collect real sensor data from your robot. Use your model to figure out your experimental setup, including data collection. How will you be able to record and label the real sensor readings from your robot? 

For example, let's say you have a robot with one sensor facing forwards and one sensor facing left, and are printing the values to the Serial Monitor with a timestamp. You might consider placing the robot down in an ideal condition, facing forwards, exactly the correct distance from the wall. Then, you could start a timer on your phone at the same time you press the `reset` button on the Arduino. Now you've zeroed your timer and will be able to know which readings correspond to timestamps on your phone.

However, you may be able to come up with a much better experimental system by using Processing.org, or some other solution. Discuss this with your team.


### 2. Determine $P(Sensor)$ and $P(Corner)$ analytically
Before starting your experiment, just using your model and reason, you can work out both the $P(Sensor)$ and $P(Corner)$ terms of the equation. Of course, you could also determine these terms experimentally, but it's worthwhile trying to understand them analytically first.

$P(Sensor)$ refers to the probability that the sensor has any particular reading, i.e., you're looking at sensor resolution. You can read a [helpful datasheet](https://handsontec.com/dataspecs/sensor/SR-04-Ultrasonic.pdf) to get the range, but you know from your own experience that the sensor is accurate within a range of about `2cm` to `100cm`. If you choose to split that range into `1cm` blocks, then $P(Sensor = x)$ for any $2 < x < 100$ is $1/98$. Why? You've got $98$ possible centimeters between $2$ and $100$.

However, maybe you care about a range of positions, such as `5cm` $+/-$ `1cm`, so you have to do $P(Sensor = 4 \cup Sensor = 5 \cup Sensor = 6)$. Luckily, that's just $P(Sensor = 4) + P(Sensor = 5) + P(Sensor = 6) = 3/98.$ 

If you have two sensors, then you need to do $P(SensorA = x, SensorB = y)$. You can do this by listing all the possibilities in pairs, i.e., $(x=2, y=2), (x=3, y=2) ... (x=100, y=100)$. There should be $98 x 98$ possibilities. Which ones do you care about?

Note that, below a certain threshold, the discretization of the sensor range doesn't impact the final result very much. If you choose to go with `0.1cm` blocks, your final fraction will be the same. If you go with `10cm` blocks, you'll lose a point of precision. Does it matter?

Now do the same for $P(Corner)$. This is all about spatial resolution. How many positions can your robot possibily occupy? You'll have to make a choice about discretization again.


### 3. Determine $P(Sensor | Corner)$ experimentally
Now, you want to figure out how likely it is that your sensor is going to accurately read within the range you're interested in, given that your robot is actually in the corner. 

It's helpful to figure out $P(Sensor | \neg Corner)$ to get this clear. That is, where are the points along the wall where your robot could potentially give the target sensor reading, but not actually be in the corner? For example, the robot could accidentally be rotated. Similarly, you could really truly be in the corner, but the robot is facing the wrong direction.

Place your robot down against a real wall with a real corner. You can make one out of cardboard or some books if you want. Take measurements from your sensors and label them as being either in the corner, or not in the corner. Make sure to capture the edge cases, e.g., your robot being accidentally rotated.

After you've captured your data, calculate $P(Sensor | Corner)$. If it doesn't make sense analytically, try to figure out what the problem was and redo your experiment.


### 4. Perform live predictions (homework)
Now that you've got your probabilities, you can now predict whether or not your robot is in the corner. Drive your robot along the wall, either using remote-control, or autonomous navigation. How accurate is your model? If it's inaccurate, why is it inaccurate? How can you improve your model? Create a demonstration and post a video on Piazza before next lab.

As usual, you will be marked on the following scale:

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion.