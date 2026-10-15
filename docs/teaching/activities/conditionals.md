# Conditional Probabilities
This exercise is entirely possible to do on paper. Conditional probabilities are just probabilities that take into account extra evidence to subset a probability space. Let's spend some time drawing one for the robot.

## Robot is along an X postion
As we know from before, the robot can be a distance from a wall. Let's call that the `x` position. If there are four `x` positions, then the `p(x=a)` means the probability that `x` is equal to any specific one of the positions. Therefore, `p(x=a) = p(x=3) = 1/4`.

```
1 2 3 4
    ^
```

The `or` operation for mutually-exclusive events is simply an addition, i.e., `p(x=2) + p(x=3) = 2/4 = 1/2`. They are mutually-exclusive because the robot cannot be in two positions at once.

```
1 2 3 4
  ^ ^
```



## Robot is along an X-Y postion
Now, our robots will more likely be along an X-Y position from a wall. Let's draw that like a 4x4 grid:
```
01 02 03 04
05 06 07 08
09 10 11 12
13 14 15 16

```
The probability that the robot is in any particular position is `p(x=a,y=b)` which is `1/16` because we're interested in `1` position out of the `16`. Let's re-write the above grid as coordinates and put some bars in to see the grid:

```
|-----|-----|-----|-----|
| 1,1 | 2,1 | 3,1 | 4,1 |
|-----|-----|-----|-----|
| 1,2 | 2,2 | 3,2 | 4,2 |
|-----|-----|-----|-----|
| 1,3 | 2,3 | 3,3 | 4,3 |
|-----|-----|-----|-----|
| 1,4 | 2,4 | 3,4 | 4,4 |
|-----|-----|-----|-----|
```
So, we would write `p(x=1,y=1) = 1/16` to indicate that our belief is the robot is at `1,1`.


## Robot has a sensor
If the robot has only one sensor, we can only predict in one direction:
```
1  2  3  4  5  6  7  8  9  10
```
If the sensor is perfect, we can just directly sense where the robot is. We write `p(belief|evidence)` to ask the question of what the probability of our belief is, given some evidence. So, with a perfect sensor, `p(x=1|s=1)` means the probability that we are at position `x=1` given our sensor has measured that we are at distance `s=1`.

However, our sensors are not perfect. Usually there are errors. Let's say our sensor has a `+/- 1` error and measures exactly in `1cm` blocks. Then we could write out a table indicating the possible sensor values at each position:

```
position: 1, sensor: 0
position: 1, sensor: 1
position: 1, sensor: 2

position: 2, sensor: 1
position: 2, sensor: 2
position: 2, sensor: 3

position: 3, sensor: 2
position: 3, sensor: 3
position: 3, sensor: 4

position: 4, sensor: 3
position: 4, sensor: 4
position: 4, sensor: 5

position: 5, sensor: 4
position: 5, sensor: 5
position: 5, sensor: 6

position: 6, sensor: 5
position: 6, sensor: 6
position: 6, sensor: 7

position: 7, sensor: 6
position: 7, sensor: 7
position: 7, sensor: 8

position: 8, sensor: 7
position: 8, sensor: 8
position: 8, sensor: 9

position: 9, sensor: 8
position: 9, sensor: 9
position: 9, sensor: 10

position: 10, sensor: 9
position: 10, sensor: 10
position: 10, sensor: 11
```

These are the only possible values because we have chosen a strict discretization of `1cm`. That's not a crazy thing to choose: we often use threshold filters in robotics. There's nothing "wrong" about choosing a convenient discretization.

The above model shows us what the robot would guess in terms of no knowledge whatsoever. If it comes online, and has no reference points, hasn't taken any measurements, any of the above values could be true. We could ask a lot of questions, e.g., what is the probability that the robot is at position 5, i.e., `p(x=5)` and we could see that there are `3` cases, and `30` possibilities, so `3/30 = 1/10`. That isn't surprising. Even though we now have sensor values, we haven't asked a sensor question.

Now, let's do the same thing just with the sensor. What is `p(s=5)`? Same process: count the instances that have the sensor value of `5` and divide by total instances, so `p(s=5) = 3/30 = 1/10`.

Now imagine that the robot has run a single loop. We now have evidence. So, we can take the real sensor value, say, `s=5`, and put it in our evidence spot: `p(x=a|s=5)`. That comes from the real ultrasonic. Then, we can ask the question for each `x=a`. For example, `p(x=1|s=5)`, `p(x=2|s=5)`, `p(x=3|s=5)`? All zero. There are no cases where the sensor can possibly produce that value. 

To figure out `p(x=5|s=5)`, simply filter the list to only include cases where `s=5`.

```
position: 4, sensor: 5
position: 5, sensor: 5
position: 6, sensor: 5
```

Now the problem becomes clear: `p(x=5|s=5) = 1/3`, since our options are `x=4, s=5`, `x=5, s=5`, `x=6, s=5`, and we only want one of them.


## Robot has two sensors
For this example, let's just use a perfect sensor again. We'll worry about error soon. Once again, let's work in a 2D space with the following index coordinates:
```
|-----|-----|-----|-----|
| 1,1 | 2,1 | 3,1 | 4,1 |
|-----|-----|-----|-----|
| 1,2 | 2,2 | 3,2 | 4,2 |
|-----|-----|-----|-----|
| 1,3 | 2,3 | 3,3 | 4,3 |
|-----|-----|-----|-----|
| 1,4 | 2,4 | 3,4 | 4,4 |
|-----|-----|-----|-----|
```

Now, if the robot is facing North and has a `top` sensor and a `left` sensors, the indices above will match the sensor values. That is, we can look at a coordinate map and directly see what the sensor values should be.

```
Coordinates                   North - Sensor values
|-----|-----|-----|-----|     |-----|-----|-----|-----|
| 1,1 | 2,1 | 3,1 | 4,1 |     | 1,1 | 2,1 | 3,1 | 4,1 |
|-----|-----|-----|-----|     |-----|-----|-----|-----|
| 1,2 | 2,2 | 3,2 | 4,2 |     | 1,2 | 2,2 | 3,2 | 4,2 |
|-----|-----|-----|-----|     |-----|-----|-----|-----|
| 1,3 | 2,3 | 3,3 | 4,3 |     | 1,3 | 2,3 | 3,3 | 4,3 |
|-----|-----|-----|-----|     |-----|-----|-----|-----|
| 1,4 | 2,4 | 3,4 | 4,4 |     | 1,4 | 2,4 | 3,4 | 4,4 |
|-----|-----|-----|-----|     |-----|-----|-----|-----|
```

However, if the robot is facing a different direction, then the sensor values will be transposed. Here are the sensor values for North, South, East, West:

```
North - Sensor values
|-----|-----|-----|-----|
| 1,1 | 2,1 | 3,1 | 4,1 |
|-----|-----|-----|-----|
| 1,2 | 2,2 | 3,2 | 4,2 |
|-----|-----|-----|-----|
| 1,3 | 2,3 | 3,3 | 4,3 |
|-----|-----|-----|-----|
| 1,4 | 2,4 | 3,4 | 4,4 |
|-----|-----|-----|-----|


South - Sensor values
|-----|-----|-----|-----|
| 4,4 | 3,4 | 2,4 | 1,4 |
|-----|-----|-----|-----|
| 4,3 | 3,3 | 2,3 | 1,3 |
|-----|-----|-----|-----|
| 4,2 | 3,2 | 2,2 | 1,2 |
|-----|-----|-----|-----|
| 4,1 | 3,1 | 2,1 | 1,1 |
|-----|-----|-----|-----|


East - Sensor values
|-----|-----|-----|-----|
| 1,4 | 1,3 | 1,2 | 1,1 |
|-----|-----|-----|-----|
| 2,4 | 2,3 | 2,2 | 2,1 |
|-----|-----|-----|-----|
| 3,4 | 3,3 | 3,2 | 3,1 |
|-----|-----|-----|-----|
| 4,4 | 4,3 | 4,2 | 4,1 |
|-----|-----|-----|-----|


West - Sensor values
|-----|-----|-----|-----|
| 4,1 | 4,2 | 4,3 | 4,4 |
|-----|-----|-----|-----|
| 3,1 | 3,2 | 3,3 | 3,4 |
|-----|-----|-----|-----|
| 2,1 | 2,2 | 2,3 | 2,4 |
|-----|-----|-----|-----|
| 1,1 | 1,2 | 1,3 | 1,4 |
|-----|-----|-----|-----|
```

For a robot that is capable of facing four directions, the probability that the robot is in the North West corner can be calculated as `p(x=1,y=1|sl=1,st=1) = 1/4`. Why? There are four cases where the sensors are `sl=1,st=1`. 

```
North - Sensor values
|-----|-----|-----|-----|
| 1,1 | 2,1 | 3,1 | 4,1 |
|^^^^^|-----|-----|-----|
| 1,2 | 2,2 | 3,2 | 4,2 |
|-----|-----|-----|-----|
| 1,3 | 2,3 | 3,3 | 4,3 |
|-----|-----|-----|-----|
| 1,4 | 2,4 | 3,4 | 4,4 |
|-----|-----|-----|-----|


South - Sensor values
|-----|-----|-----|-----|
| 4,4 | 3,4 | 2,4 | 1,4 |
|-----|-----|-----|-----|
| 4,3 | 3,3 | 2,3 | 1,3 |
|-----|-----|-----|-----|
| 4,2 | 3,2 | 2,2 | 1,2 |
|-----|-----|-----|-----|
| 4,1 | 3,1 | 2,1 | 1,1 |
|-----|-----|-----|^^^^^|


East - Sensor values
|-----|-----|-----|-----|
| 1,4 | 1,3 | 1,2 | 1,1 |
|-----|-----|-----|^^^^^|
| 2,4 | 2,3 | 2,2 | 2,1 |
|-----|-----|-----|-----|
| 3,4 | 3,3 | 3,2 | 3,1 |
|-----|-----|-----|-----|
| 4,4 | 4,3 | 4,2 | 4,1 |
|-----|-----|-----|-----|


West - Sensor values
|-----|-----|-----|-----|
| 4,1 | 4,2 | 4,3 | 4,4 |
|-----|-----|-----|-----|
| 3,1 | 3,2 | 3,3 | 3,4 |
|-----|-----|-----|-----|
| 2,1 | 2,2 | 2,3 | 2,4 |
|-----|-----|-----|-----|
| 1,1 | 1,2 | 1,3 | 1,4 |
|^^^^^|-----|-----|-----|
```

This should make some intuitive sense: there are four corners, and our sensor is detecting a corner, but we don't know which one from this limited information.

