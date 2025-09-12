---
draft: false
---

# DC Motors and Gearboxes
When making things move in robotics, there is a tradeoff between size, power, voltage, and speed. If you want to generate force (torque), you can use a very large voltage, but then you need large motors and large batteries if you want to sustain that torque for a long amount of time. 

However, we often don't need things to move very quickly with a lot of force. So, instead of packing a robot with heavy high-voltage electronics, we instead equip our motors with gears. This allows the motors to move fast with low torque, but generate a slow, higher torque at the end of a gear train. The low torque input motor moves quickly and covers more distance, the high torque output gear moves slowly and covers less distance.

Take a look at the demo gearboxes and levers. You can see that they trade off distance for torque by feeling it with your hands.