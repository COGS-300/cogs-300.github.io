---
draft: true
---

# Bayes Filter
Now that we've learned Bayes, we can implement it as an ongoing process in the robot. In some ways, an iterated version of Bayes Theorem, called a Bayes Filter, is easier to understand and implement than a one-shot calculation of Bayes. 

## 1-Dimensional Bayes Filter
We'll return to the basic problem of determining where the robot's position is in terms of distance from a wall. We have just one sensor, and we have 10 possible positions from the wall.

### Initialize our beliefs
First, we'll create an array to hold our beliefs that the robot is in any particular position. Since we don't know where the robot is, each position is equally likely.

```cpp
int num_positions = 10; // maximum length we're measuring in cm with 1cm increments
float beliefs[num_positions];
void setup() {
    for (int i = 0; i < num_positions; i++) {
        beliefs[i] = 1.0 / num_positions;
    }
}
```

This is identical to our previous calculation of:

$$
P(Position = X) = \frac{1}{No. of positions}
$$

Except that we're keeping track of every possible position in a table.

### Read the sensor
Just like normal, we're going to take a sensor reading and convert it to centimeters.

```cpp
float read_ultrasonic() {
    digitalWrite(trigPin, LOW);  // start low to ensure no pulse is sent
    delayMicroseconds(5);        // ensure 5 microseconds of no signal to avoid interference
    digitalWrite(trigPin, HIGH); // start pulse high
    delayMicroseconds(10);       // continue for 10 microseconds
    digitalWrite(trigPin, LOW);  // stop pulse

    // Measure length of time before pulse comes in
    duration = pulseIn(echoPin, HIGH);

    // Convert the time into a distance
    cm = (duration/2) / 29.1;     // Divide by 29.1 or multiply by 0.0343

    return cm;
}
```

Now our loop will look like:

```cpp
void loop() {
    sensor = read_ultrasonic();
}
```

### Update Beliefs Naive
We now want to update our belief array.

```cpp
void loop() {
    sensor = read_ultrasonic();
    update_beliefs(sensor);
    pos = best_belief();
}
```

There are a few options for updating beliefs. For example, we could just decide that our current position is whatever is closest to our sensor reading:

```cpp
// A possible but not great option
void update_beliefs(float sensor) {
    // Calculate the absolute error for each position
    float errors[num_positions];
    for (int i = 0; i < num_positions; i++) {
        error[i] = abs(i - sensor);
    }

    // Set all beliefs to zero
    for (int i = 0; i < num_postions; i++) {
        beliefs[i] = 0.0;
    }

    // Find the lowest error
    int min_pos = 0;
    float min_error = errors[min_pos];
    for (int i = 0; i < num_postions; i++) {
        if (errors[i] < min_error) {
            min_error = errors[i];
            min_pos = i;
        }
    }
    
    // Set the lowest error to maximum
    beliefs[min_pos] = 1.0;
}

```

Now we simply find the maximum belief:

```cpp
float best_belief() {
    // Find the position with the highest belief
    float maximum = 0.0;
    float max_pos = 0;
    for (int i = 0; i < num_positions; i++) {
        if (beliefs[i] > maximum) {
            maximum = beliefs[i];
            max_pos = i;
        }
    }
}
```

Hopefully you can see that this is not very robust to fluctuations in error. Say that our sensor kept reading $4.5cm, 5.5cm, 4.5cm, 5.5cm...$. Our min error and therefore max belief would keep flipping between $4cm$ and $5cm$. But really, we would want it to stablize at $5cm$.


### Update Beliefs Bayes
Instead of the naive approach above, we're going to add a little normal distribution to model the likely error of our system:

```cpp
float sensor_model(float sensor, int pos) {
  const float sigma = 5.0;
  float error = pos - sensor;
  return exp(-0.5 * (error * error) / (sigma * sigma));
}

void update_belief(float sensor) {
  float total = 0;
  for (int i = 0; i < num_positions; i++) {
    beliefs[i] = beliefs[i] * sensor_model(sensor, i);
    total = total + beliefs[i];
  }

  // Normalize to keep the final sum of the array ~= 1.0
  for (int i = 0; i < num_positions; i++) {
    beliefs[i] = beliefs[i] / total;
  }
}
```

Now, instead of just throwing away prior information, we're storing it as our `beliefs` array. That's because of this line:

```cpp
beliefs[i] = beliefs[i] * sensor_model(sensor, i);
```

Although it might not look like it at first glance, this line is also our Bayes Theorem step of $P(Position) \times P(Sensor|Position)$. We're taking the probability for the index that corresponds to a position, and multiplying it by our model of the likelihood that a sensor value reads a particular value at some position.

Putting in some concrete numbers will help understand the sensor model:

If the robot is at $5cm$ from the wall, but there is some normally-distributed error, then the tendency of the `beliefs` array will be to converge towards $5cm$. That's because `sensor_model(4.5, 5)`, `sensor_model(5.0, 5)`, and `sensor_model(5.5, 5)` will all be very close to `1.0`:

```cpp
sensor_model(4.5, 5) = 0.9950
sensor_model(5.0, 5) = 1.0000
sensor_model(5.5, 5) = 0.9950
```

So our sensor model is just a normal distribution centered centred on the position with lowest error. You can tune the distribution to look more like the real sensor values that you get, or you can do something more complex like implement a lookup table with your real, experimental data. In either case, we're just trying to make a probability distribution look like real life.

## Summary of Bayes Filter
Hopefully this version of Bayes helps to solidify the big idea behind Bayes: we're just multiplying probabilities over and over again to estimate the robot's state. Zooming out to the big picture, using the Bayes Filter will help your robot deal with normally-distributed error. Although this example was just 1-D, the filter generalizes to multiple dimensions. So, for example, if you're trying to guess where you are in the maze, this may help.