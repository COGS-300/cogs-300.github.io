---
draft: true
---

# Bayes Theorem
As we learned last time in our lesson on [probability](/docs/teaching/activities/probability), the mathematical definitions for probability are as follows.

Formula for single events:
$$
P(A) = \frac{\text{No. of outcomes for event A}}{\text{No. of possible outcomes}}
$$

$$
P(B) = \frac{\text{No. of outcomes for event B}}{\text{No. of possible outcomes}}
$$


Formula for a union of events:
$$
P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)
$$

Formula for joint events:
$$
P(A \text{ and } B) = P(A) \times P(B | A)
$$

Formula for conditional events:
$$
P(A|B) = \frac{P(A \text{ and } B)}{P(B)}
$$

Just from those definitions, we can see that, depending on the unknowns in the situation, we might rearrange the definition of joint and conditional events:

$$
P(A|B) = \frac{P(A \text{ and } B)}{P(B)} = \frac{P(A) \times P(B | A)}{P(B)}
$$

This can seem quite abstract. Let's translate this into a common robotics problem.

## 1-Dimensional Bayes
Let's call the event $A = Sensor$ the probability that our sensor reads some value. For example, if we have a perfectly accurate sensor in the range of $1-10cm$ and it reads only in $1cm$ increments, then, a priori (with only prior analytical knowledge), $P(Sensor=1) = \frac{1}{10}$. Now, let's call the event that our robot is at a particular distance from a wall $B=Position$, and we'll say that the robot can be $1-10cm$ from the wall in $1cm$ increments. So, a priori, $P(Position=1) = \frac{1}{10}$. 

If these were truly independent events, the likelihood that $P(Sensor=5, Position=5) = \frac{1}{100}$ because $P(A \text{ and } B) = P(A) \times P(B)$. But, usually, we attach our sensors to our robots, making these events dependent. The *dependent* event joint probability is $P(A \text{ and } B) = P(A) \times P(B|A)$. So, if our sensors are working perfectly and everything is calibrated, what's the likelihood that the sensor reads $5cm$ when we're actually at $5cm$? 100%, right? If we don't know where the robot is and haven't looked at anything, $P(Sensor=5) = \frac{1}{10}$, but if we are looking at the reading and it really does say $5cm$ and we're really at $Position=5cm$, then the probability that we're there and the sensor reads correctly is $1.0$.

Figuring out the *perspective* of modelling can be difficult! For the most part, we want to imagine that *we're the robot*. And the robot has no knowledge of truth, unlike you, who can reference a ruler or some other objective measurement tool. So, the robot doesn't "know" where it is except insofar as the sensors give it information.

But we know that our robots are error-prone, so building the best guess of where we are, as the robot, can take some time. If we have an error of $\pm 1cm$, then $P(Sensor=5, Position=5) = \frac{1}{10} \times \frac{1}{3} = \frac{1}{30}$. Why? Because we can count ahead of time that there are three possible values (due to error) that the sensor will read given we're at a particular position, and we can be at one of 10 possible positions. It's better than $\frac{1}{100}$, but still not perfect.

But you might notice that we actually need to ask the reverse question, $P(Position=5|Sensor=5)$. We usually can't just count $P(Position=5|Sensor=5)$ very easily. In this toy example, we can probably count it (do go ahead and try), but normally, it's very hard. 

This is where the power of Bayes comes in.

$$
P(A|B) = \frac{P(A \text{ and } B)}{P(B)} = \frac{P(A) \times P(B | A)}{P(B)}
$$


$$
P(Position|Sensor) = \frac{P(Position \text{ and } Sensor)}{P(Sensor)} = 
$$
$$
\frac{P(Position) \times P(Sensor | Position)}{P(Sensor)}
$$

We already know all these terms, so let's remind ourselves of them:

$$
P(Position=5) = \frac{1}{10}
$$
$$
P(Sensor=5) = \frac{1}{10}
$$
$$
P(Sensor | Position) = \frac{1}{3}
$$
$$
P(Position|Sensor) = \frac{P(Position) \times P(Sensor | Position)}{P(Sensor)}
$$
$$
P(Position|Sensor) = \frac{\frac{1}{10} \times \frac{1}{3}}{\frac{1}{10}}
$$

Dividing out, we get back $\frac{1}{3}$. Lots of work for what seems like a simple answer, but it's not obvious that this would be the answer ahead of time. You'll see in a moment why it's helpful in more complex situations.

## 2-Dimensional Bayes
The real power of Bayes becomes clear when you can see that we have both *false positives* and *false negatives* to contend with. Let's say we're doing corner detection, which is something you likely want to do with your robot. A false positive is when the robot thinks it's in the corner, but actually isn't. The false negative is when the robot thinks it's not in the corner, but it actually is.

Let's set up a corner with a 2D robot, as in, it can actually turn. We have to choose some level of discretization to make the calculation easy to understand, so let's choose that the robot can be in any $Position=(X, Y, A)$ with $A=Angle=\{N, NE, E, SE, S, SW, W, NW\}$. So, for each tile, there are $8$ possible positions that the robot can be in. Let's use the same $Sensor$ resolution, range and error as before, i.e. $Sensor={1 - 10}$ with $1cm$ intervals and $\pm1cm$ error. However, now we need a $Left$ and a $Right$ sensor to detect the corner.

## Count the probability of each sensor value
Just like with our dice from last class, we can simply create a matrix of values for our sensor readings. Design an $N \times N$ matrix that shows the $(Left, Right)$ pairs.

## Count the probability of each position
Start by getting the probability that the robot is in any specific position. A simplifying assumption is that the robot cannot go beyond the walls. Count the tiles and angles, and come up with a probability.

$$
P(Position=(X, Y, A)) = \frac{1}{\text{No. of tiles } \times \text{ No. of Angles}}
$$

## Define Being "In the Corner" and calculate the probability of being there
Now we can decide that being in a small selection of tiles is being "in the corner". Choose the positions that count as being in the corner, and calculate the probability.

## Set up the equation for Bayes
$$
P(Corner|Sensor) = 
\frac{P(Corner) \times P(Sensor | Corner)}{P(Sensor)}
$$


## Calculate P(Sensor | Corner)
Now, $P(Sensor | Corner)$ has a bit more nuance because of false positives and false negatives. Every time the robot is turned around (and it happens!), it might "think" you're in the corner and you're actually just turned around. In the real world with real robot dynamics, the robot can't tell the difference between being in the corner, or being turned around. 

It is helpful for this calculation to make sure you can calculate both $P(Sensor | Corner)$ and $P(Sensor | \neg Corner)$.

## Calculate P(Corner | Sensor)
Now that you've got all of the individual parts of Bayes, you can just plug in the missing values.

## Compare our Analytical approach to an Experimental approach
Today's lesson has been an analytical modelling example. However, you can use your real robot to get real values from the real world. 

For example, you can simply place your robot down in a particular position and record the data that you get from the robot. Put the data into a spreadsheet, and you don't need to "count" the probability.

The difficulty is always in filtering and binning your data. For example, you might notice that keeping your robot at a specific position gives you a variety of sensor readings. Do you read all of the data and use that distribution? 

Some of this you won't know until you actually put the robot down and play with it. But we can make some predictions about how the experiment will go. We'll use a technique called *data diagramming* where we visualize the likely values of the data, and make an experimental and analytical protocol based on that.

Start with a sketch of the experimental protocol. Write down what you will do. Act it out on your table with a fake robot. Think through all of the problems you might encounter.

For the data diagram, draw the likely distributions of the data you'll encounter. If you see one distribution vs. another, what will you do? Plan for each contingency. You'll be doing this for real in your labs.