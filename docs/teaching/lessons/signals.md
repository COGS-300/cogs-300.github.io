# Digital Signals

## Introduction
As you saw in the [Electricity 101](/teaching/activities/electricity) activity, we can make a `HIGH` or `LOW` signal by setting a voltage to `5V` or `0V`. The threshold for `HIGH` is arbitrary (but has good engineering reasons behind it). The measurement for `5V` is relative to something we define as `0V`, so we need an electrically neutral material to reference the voltage to, such as the ground. 

You might see `0V` marked as `ref` for reference, or `GND` for ground. The assumption is that because the ground is big, it will quickly dissipate any charge and return to roughly neutral. You can think of the Earth as a big, electrically neutral material—on average, of course, since it can have local charge buildup such as when lightning strikes.

If we create a way to indicate our signal, like attaching an LED to the circuit, we can see what's going on with the signal. If the circuit is complete, and the voltage is `HIGH`, the LED will be `ON`, and we usually write that with a `1` (because it looks like a closed circuit). If the circuit is not complete, the voltage will be `LOW`, the LED will be `OFF`, and we usually write that with a `0` (like an open circuit from a different direction).

A digital signal means that the signal can be represented entirely with a series of `1` or `0`. For many devices, a simply `1` or `0` signal is enough to communicate a message. For example, on the bus, if you indicate that you would like the bus to stop, you simply press the "STOP" button, and a light turns on, letting the bus driver know that they should stop. Many other cases exist: a light to indicate that the door can open, a light to indicate that your gas is too low, a brake light that indicates that a car is slowing down or stopping, and many other examples.

## Encoding
As the above examples show, the simple paradigm of `ON` or `OFF` can indicate many different meanings through context. We call the relationship between the pattern of `1` and `0` and a particular meaning the _encoding_. For _1-bit_ signals where a system can either indicate `ON` or `OFF`, you can only have two possible "patterns" of `1` or `0`. For _2-bit_ encodings, you can have four possible patterns:

```
11
10
01
00
```

If you would like to send a message using these patterns as a signal, then you would have to decide, along with your interlocutor, what each pattern would indicate. For example, if we wanted to design a car braking system with two brake lights, we could say:

- `11` will mean stopping quickly
- `10` will mean stopping slowly
- `01` will mean accelerating
- `00` will mean accelerating quickly

The encoding is exactly the mapping written above. Notice, however, that the context is very important if you would like to be effective in a safety-critical environment. Consider the following questions:
- How big are the lights?
- What colour are the lights?
- Where are the lights placed?
- How long does each light stay on? You may need yet another encoding.
- What happens if only some people know about the encoding, but not all?

