# Filters in Signal Processing
When we receive a signal, it's rare that it is purely clean. Like static on an old TV or radio, it's common to have noise included in the signal. We therefore have to extract the information that we want (signal) from the information we don't want (noise).

The field of signal processing deals with this basic problem of extracting signal from noise. One of the simplest filters is a threshold filter. You can think of it as an if-statement:

```cpp
if (signal > threshold) {
    return signal;
}
```

You can also think about passing the filter over an array that holds the signal:

```cpp
int output[length];
for (int i = 0; i < length; i++) {
    if (signal[i] > threshold) {
        output[i] = 1;
    } else {
        output[i] = 0;
    }
}
```

For Arduino programs, we often have to deal with moving filters since we're operating in a loop. That is, we don't have a static signal array, but it's like we're continually looping through one.

Many people choose to implement threshold filters for their robots. For example, they may choose to write:

```cpp
int wall_distance = 5; // cm
if (distance < wall_distance) {
    TurnLeft();
} else {
    TurnRight();
}
```

This often works well, and many successful projects have been built off of nothing more than a chain of if-statement.

However, the problem with a threshold filter is that it only takes into account information that is happening right now. So, let's say that the wall is `5cm` away, but the noise in this signal means that we're getting the following readings:

```
4.99cm
5.01cm
4.98cm
5.03cm
...
```

You may not want the robot turning right and left very quickly. One way to keep the signal more "smooth" and therefore your robot action more smooth is to include a simple running average:

```cpp
float last_measurement;
float this_measurement;

// ...

void loop() {
    this_measurement = getMeasurement();
    running_average = (this_measurement + last_measurement) / 2;
    if (running_average > threshold) {
        doSomething();
    }
    last_measurement = running_average;
}

```

There are tradeoffs with this. For example, it might take an extra loop to react to information that is happening now. However, the loops mostly happen fast enough that that's not a big problem.

You can also keep a "history" of measurements. For example, you can store the last five measurements in an array:

```cpp
int length = 5;
float history[length];

int loop() {
    // Move all the measurements back
    for (int i = 1; i < length; i++) {
        history[i-1] = history[i];
    }

    // Get the current measurement
    history[length - 1] = getMeasurement();

    // Average all measurements
    float sum = 0;
    for (int i = 0; i < length; i++) {
        sum = sum + history[i];
    }
    float running_average = sum / length;

    if (running_average > threshold) {
        doSomething();
    }
}

```

The longer your history, the more smooth your signal will be. However, also, the less responsive your robot will be. It's a delicate balance to tune a filter.

Many other filters are possible. You can weight them and chain them. The above examples show chains where we both apply a running average and a threshold filter. 

Getting a conceptual grasp of filters will help you to understand the Arduino's `loop`. Even if it seems like you might not need them now, they will be useful as we progress through the course.