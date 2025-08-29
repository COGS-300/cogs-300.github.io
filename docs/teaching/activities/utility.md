---
description: Assigning value to actions
---
# Utility
## Introduction
Utility is a widely-used concept in decision theory and originates particularly in the philosophy of labour and economics. The idea was to assign a numerical value to products and services that corresponds to the amount that they could be sold for. In economics, it's a hard quantity to define, since it depends on the preferences of individuals and groups of individuals. 

In robotics, we can just make the number up to serve whatever ends want our robot to reach. In this activity, we will do exactly that on paper with one of our maze-following robots.

### Materials
- Paper and pens

---
## Activity
We can think of setting up a schema for rewards for our robot. One possibility would be to assign an energy cost to each action. Taking an action costs `1 unit` of energy. For illustration's sake, let's call it `$1`. Every action, including standing still, costs `$1`.

From our god-like perspective above the robot, we say that every movement towards the end goal of the maze gives a reward of `$10`, every movement away from the goal gives a reward of `$0`, and a sideways movement gives a reward of `$1` so that the benefit remains neutral. Reaching the goal gives a reward of `$100` and stop. Not reaching the goal just wastes money.

If we can transmit the value magically to the robot, the robot will then take the next best action that will give it the most money. If we lay out the rewards along the path that leads to the goal, the robot will find the goal very easily by following the next best action.

However, there are some problems. 

One is value maximization. Let's say we want the robot to maximize value and we allow it to see eleven moves into the future. The robot will see the terminal path to the goal and realize that it will make more money by looping back and forth rather than ever choosing the goal.

The other is that robots don't know the long-term outcome of their actions a priori. There are a few solutions to this: god-like labelling and giving direct utility to the robot, simulation to learn long-term outcomes, or in-the-moment utility assignment. We'll explore these step-by-step in this activity.

*Note that for non-robotic agents, the utility can sometimes be easier to assign since there are fewer physical limitations. For example, a video game enemy can have god-like access to "see through walls," but our robot can not.*


### Design a god-perspective simple reward schema for a 2D robot in a hallway with a corner
Let's say the robot can turn left, turn right, drive straight forward or straight backwards. For now, it's a perfect robot, i.e., it makes perfect 1-square moves when driving forward and backward, and perfect 90° turns when turning left or right. If it has any sensors, they work perfectly.

Design a dead-simple reward function from a god-like perspective that guides the robot to the goal. Then, make sure the reward function works for higher and higher lengths of futures. Is there a limit?


### Design a simulation reward schema for a 2D robot in a hallway with a corner
Now let's say we're simulating the same robot. In this case, you have access to god-like powers to design the reward function, but you're trying to eventually upload the reward schema to the robot, which will not have any god-like powers while it runs. Again, you can imagine a technically perfect robot, since, in the simulation, it can be.

The major difference for this schema is that you will need to make the reward relative to sensor readings. 


### Design an in-the-moment reward schema for a 2D robot in a hallway with a corner
Finally, we will imagine the real robots that we really use in lab. Is there any way to tell whether an action is a good or a bad action? What do you need to know in order to evaluate an action? Talk about it with your table.


---
## On your own
Utility-based agents have been common in simulations, video games, and trading for a long time. However, with LLMs and Agentic AI systems, it's now possible to create much more interesting utility-based agents with natural language reasoning abilities. We'll look at Agentic AI in a few weeks. For now, it's best to try to wrap your head around utility systems from the economic and personal value perspective.

The way to apply utility-based reasoning to your own life is by starting with preference ranking. Analyze your day-to-day actions in terms of preferences. Would you prefer cheeseburgers or hotdogs? Would you like salad or fries? What would give you the highest utility? Does that change with context or timeframe?

---
## Philosophical Connection
The major critique of utility is that it is an abstract number that is supposed to accurately represent something that seems intangible—human desire. This is the subjective theory of value. However, it seems a bit difficult to make objective: how can you possibly assign a number to a want or a need? 

The labour theory of value favoured by Adam Smith and Karl Marx is one that is commonly held up as objective to some degree. The average amount of time it takes to create a product is the value of the product, which may or may not match the market value. This is part of why other theories of value were created.

What do you think brings something value? Do you value things based on your subjectivity or the amount of work it took to produce it? Does that change if it's you or other people doing the work? Why?