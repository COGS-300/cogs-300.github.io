# PID Control
PID control (proportional, integral, derivative) is one of the most common engineering control algorithms for systems. The systems can be as large as a boiler for an industrial food processing plant, or as small as your little self-driving robots.

The basic premise is that you have some target that you're trying to reach, called a set point, and you want to control your approach of that target, called the output. You want to therefore measure how far you are from that target, and output a certain amount of power to get you moving towards that target.

For the industrial food processing plant example, if you wanted the stuff that you're boiling to reach a certain temperature, you might turn the burner on even hotter than the eventual temperature you want it to be. But, as you get closer to the correct temperature, you don't want to overheat, so you turn down the amount of heat that you apply, while still applying some.

For your robots, the way you'll use PID is that you'll be following a wall from a certain distance. The further away from the wall you are, the faster you'll want to move towards the wall. The closer you are, the slower you'll want to move so you don't overshoot your set point.

For PID control in this class, we will mostly focus on the "P" part of PID, which stands for proportional. The basic P-control system looks like this in pseudocode:

```cpp
setup:
    p = -0.5 // you set the strength of the p-control
    set = 5cm // you choose where the robot should go

loop:
    position = get_measurement() // the robot measures the world
    error = set - position  // determine how far away the robot is from where it should be
    output = p * error // motor output is proportional to error
```

This runs over and over again in your loop. Notice that the set point doesn't change, and the `p` setting doesn't change. The only things that change are the position of the robot, the error, and the motor output.

The process of tuning a PID controller is that you make a pretty good guess for `p`, test to see whether it works. If you are wildly overshooting the set point, you turn it down. If you are not making very much progress towards the set point, you turn it up.

The ideal setting for `p` is that you get almost, but not quite, to the set point. The other terms are there to help you if you want to exactly hit the set point, but they won't be very necessary for this class.

## Adding other terms
If you do care to add other terms, here's a brief explanation for how they work.

The `d` (derivative) control is there to guard against over-acceleration. The basic system would look like:

```cpp
// Added d term
setup:
    p = -0.5 // you set the strength of the p-control
    d = 0.1 // you set the strength of the d-control
    last_error = 0 // initialize last error to 0
    set = 5cm // you choose where the robot should go

loop:
    // the robot measures the world
    position = get_measurement() 
    // determine how far away the robot is from where it should be
    error = set - position  
    // difference in error, you could divide by time if you want a proper derivative
    derr = last_error - error 
    // motor output is mostly proportional to error, but is modulated by the change
    // in error from this time to last time. 
    output = (p * error) + (d * derr) 
```
Think about a robot that is `100cm` away from its set point at `5cm` and you want it to get to the set point as fast as possible, so you set a high `p`. You might be maxing out the speed of the robot, and the error is changing at a constant rate. However, when you overshoot the set point, you suddenly slam the robot in max speed in reverse. You very well might go back and forth over the set point in definitely. But, if you have a `d` term, big changes in error will be attenuated, but small changes in error will barely be noticed.

The `i` (integral term) means that you add up the error. You probably want to set this fairly low so that only large accumulations in error will make a difference. For example, you might be close to the mark for a "long" time, and the error adding up will eventually move the robot closer. It would look like this:

```cpp
// Added d term
setup:
    p = -0.5 // you set the strength of the p-control
    d = 0.1 // you set the strength of the d-control
    i = 0.0001 // you set the strength of the i-control
    
    total_error = 0 // initialize total error to 0 
    last_error = 0 // initialize last error to 0
    set = 5cm // you choose where the robot should go

loop:
    // the robot measures the world
    position = get_measurement() 
    // determine how far away the robot is from where it should be
    error = set - position  
    // difference in error, you could divide by time if you want a proper derivative
    derr = last_error - error 
    // add up the error from this run
    total_error = total_error + error
    // motor output is mostly proportional to error, but is modulated by the change
    // in error from this time to last time. 
    output = (p * error) + (d * derr) + (i * total_error)
```

You can mix and match these terms all you want. PD controls, PI controls, ID controls, I-only are all valid control systems. It's just a way to control a system's behaviour, so you get to make the decision as a system designer.