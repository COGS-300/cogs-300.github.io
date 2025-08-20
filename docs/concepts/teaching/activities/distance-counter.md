---
description: Building up to an optical encoder
---

# DIY Distance Counter: A Bad Distance Sensor

## Introduction
What is a distance sensor? The phrase sounds very proper and official, but you'll see soon that even very sophisticated sensors are built from the same building blocks that we are exploring in this class. For this exercise, imagine that we're using a gantry robot, that is, a robot that is fixed to a rail. It could be a big industrial gantry robot, or it could be a little 3D printer. Since it's fixed to a rail, all we need to know is distance from one side of the rail to the other.

### Materials
- Popsicle sticks
- Something that rolls like a toy car

---
## Activity
### The Worst Bad Distance Sensor that is used every day
The "worst" possible distance sensor can be made from just a switch. But, actually, they're not the "worst," they work really really well, so they're used every day in industrial and hobbyist machines around the world. They're called [limit switches](https://en.wikipedia.org/wiki/Limit_switch), and they're used to tell when a machine is at the origin. In other words, they measure the `0` distance.

If you put a switch on the other side of the machine (the other limit), then it's a `maximum` distance sensor. If you measure the maximum distance, the size of the object that's moving between `0` and `maximum`, then you know how far the face that hit the `0` limit switch moved. Simple, but not always obvious!

### Design the Second-Worst Bad Distance sensor
Now, imagine that you want to sense distances in-between `0` and `maximum`, but you can only use switches (as many as you need). Don't worry about making it "perfect" or "efficient", just come up with a design that would "work".

### Design an Arbitrary-Length distance sensor
Now, imagine that you may not know the maximum distance that the robot will travel, but you're still on a rail, like on a real-life railway car. You might know the distance between railway stations, but you want to know the distance travelled along the way, say, for an on-board time tracker.

You can design this just with switches. But you don't need to use thousands of them. Come up with a way to measure arbitrary distance with just a small number of switches.

---
## On Your Own
Now that you've designed a pretty good bad distance sensor using just a switch, how would you extend this to use other potentially more sensitive components? We are building towards the design of an optical encoder. However, before you look up the design of an optical encoder, try to imagine how you would build your own.

---
## Philosophical Connection
You might have noticed that there is a surprising disconnect between a robot's version of "knowing where it is" and a human's version. The robot needs to record, with high precision, a numeric representation of a distance to "know where it is." However, humans seem to need a lot less numeric precision and seem to use an entirely different way of navigating [(see cognitive maps)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6028313/). 

You might notice there's a category error in making the comparison above. A grounded robot (as in, it's connected to the rail, which is connected to the ground) is measuring relative to a fixed object. A more appropriate analogy might be the skeleton for grounding, and proprioception in the muscles for measurement. So, then the question becomes whether the analogy between distance sensing and body position sensing is valid. Do you think our body's position relative to itself is somewhat numeric? If so, is it like the switches we used? How is it similar and/or different?
