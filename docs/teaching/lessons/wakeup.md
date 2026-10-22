---
draft: false
---

# Wake Up with Bayes

Here's an example of how you could run an experiment for the "Does bedtime impact waking up?" example from class (needs drawings, explanations, and annotations; this is NOT a full example of a perfect design challenge):

- **A:** Belief that I will wake up in the morning at a particular time.
- **B:** Evidence of how bedtime conditions my morning wake-up time.

A ∈ `{4am, 5am, 6am, 7am, 8am, 9am, 10am, 11am, 12pm, 1pm}`

B ∈ `{5pm, 6pm, 7pm, 8pm, 9pm, 10pm, 11pm, 12am, 1am, 2am}`

## Analytical setup

- **P(A):** 1/10 because there are 10 wake-up times.
- **P(B):** 1/10 because there are 10 bedtimes.
- **P(B|A):** Probability that I have gone to bed at a particular time given when I am observed to wake up. Needs a rhetorical justification or simulated data with an explanation. For example, I never sleep fewer than 4 hours or more than 12 hours, so `P(B=2am|A=4am) = 0`, but `P(B=5pm|A=4am) = 1/8` because 1am and 2am are impossible, but anything else is not impossible with that outside knowledge of your sleep behaviour.
- **P(A|B):** Probability that I will wake up at a particular time given when I have gone to bed. Needs a rhetorical justification or simulated data with an explanation. For example, I never sleep fewer than 4 hours or more than 12 hours, so `P(A=4am|B=2am) = 0`, but `P(A=4am|B=5pm) = 1/2` because there are only 2 possibilities that are within the 12-hour maximum window.

## Experimental setup

I will record in a table my actual bedtimes and actual wake-up times for a month, which will look like this:

| Day | Bedtime | Wake-up | Duration |
|-----|---------|---------|----------|
| 1 | 11:10 PM | 7:15 AM | 8h 05m |
| 2 | 11:35 PM | 7:30 AM | 7h 55m |
| 3 | 10:55 PM | 7:05 AM | 8h 10m |
| 4 | 12:05 AM | 8:00 AM | 7h 55m |
| 5 | 11:45 PM | 7:40 AM | 7h 55m |
| 6 | 12:30 AM | 9:00 AM | 8h 30m |
| 7 | 1:10 AM | 9:45 AM | 8h 35m |
| 8 | 11:20 PM | 7:20 AM | 8h 00m |
| 9 | 11:50 PM | 7:10 AM | 7h 20m |
| 10 | 11:05 PM | 7:15 AM | 8h 10m |
| 11 | 12:15 AM | 7:35 AM | 7h 20m |
| 12 | 11:30 PM | 7:40 AM | 8h 10m |
| 13 | 12:45 AM | 9:10 AM | 8h 25m |
| 14 | 1:30 AM | 10:00 AM | 8h 30m |
| 15 | 11:00 PM | 7:00 AM | 8h 00m |
| 16 | 11:25 PM | 7:30 AM | 8h 05m |
| 17 | 12:00 AM | 7:15 AM | 7h 15m |
| 18 | 10:50 PM | 7:05 AM | 8h 15m |
| 19 | 11:40 PM | 7:30 AM | 7h 50m |
| 20 | 12:20 AM | 8:55 AM | 8h 35m |
| 21 | 1:05 AM | 9:30 AM | 8h 25m |
| 22 | 11:15 PM | 7:20 AM | 8h 05m |
| 23 | 11:55 PM | 7:25 AM | 7h 30m |
| 24 | 11:05 PM | 7:10 AM | 8h 05m |
| 25 | 12:10 AM | 7:20 AM | 7h 10m |
| 26 | 11:30 PM | 7:45 AM | 8h 15m |
| 27 | 12:40 AM | 9:00 AM | 8h 20m |
| 28 | 1:15 AM | 9:50 AM | 8h 35m |
| 29 | 11:20 PM | 7:20 AM | 8h 00m |
| 30 | 11:45 PM | 7:30 AM | 7h 45m |

### Probability of wake-up times: P(A)

Here is P(A) if we have 15-minute intervals for discretization:

| Wake-up time (A) | Count | P(A) |
|------------------|-------|------|
| 7:00 AM | 3 | 0.1000 |
| 7:15 AM | 9 | 0.3000 |
| 7:30 AM | 6 | 0.2000 |
| 7:45 AM | 3 | 0.1000 |
| 8:00 AM | 1 | 0.0333 |
| 9:00 AM | 3 | 0.1000 |
| 9:15 AM | 1 | 0.0333 |
| 9:30 AM | 1 | 0.0333 |
| 9:45 AM | 2 | 0.0667 |
| 10:00 AM | 1 | 0.0333 |

### Probability of bedtimes: P(B)

Here is P(B) if we have 15-minute intervals for discretization:

| Bedtime (B) | Count | P(B) |
|-------------|-------|------|
| 10:45 PM | 1 | 0.0333 |
| 11:00 PM | 4 | 0.1333 |
| 11:15 PM | 4 | 0.1333 |
| 11:30 PM | 4 | 0.1333 |
| 11:45 PM | 4 | 0.1333 |
| 12:00 AM | 3 | 0.1000 |
| 12:15 AM | 3 | 0.1000 |
| 12:30 AM | 1 | 0.0333 |
| 12:45 AM | 2 | 0.0667 |
| 1:00 AM | 1 | 0.0333 |
| 1:15 AM | 2 | 0.0667 |
| 1:30 AM | 1 | 0.0333 |

### Conditional probability: P(B|A)

| Wake-up time (A) | Bedtime (B) | P(B\|A) |
|------------------|-------------|--------|
| 7:00 AM | 10:45 PM | 0.3333 |
| 7:00 AM | 11:00 PM | 0.6667 |
| 7:15 AM | 11:00 PM | 0.2222 |
| 7:15 AM | 11:15 PM | 0.4444 |
| 7:15 AM | 11:45 PM | 0.1111 |
| 7:15 AM | 12:00 AM | 0.1111 |
| 7:15 AM | 12:15 AM | 0.1111 |
| 7:30 AM | 11:30 PM | 0.3333 |
| 7:30 AM | 11:45 PM | 0.3333 |
| 7:30 AM | 12:00 AM | 0.1667 |
| 7:30 AM | 12:15 AM | 0.1667 |
| 7:45 AM | 11:30 PM | 0.6667 |
| 7:45 AM | 11:45 PM | 0.3333 |
| 8:00 AM | 12:00 AM | 1.0000 |
| 9:00 AM | 12:15 AM | 0.3333 |
| 9:00 AM | 12:30 AM | 0.3333 |
| 9:00 AM | 12:45 AM | 0.3333 |
| 9:15 AM | 12:45 AM | 1.0000 |
| 9:30 AM | 1:00 AM | 1.0000 |
| 9:45 AM | 1:15 AM | 1.0000 |
| 10:00 AM | 1:30 AM | 1.0000 |

### Conditional probability: P(A|B)

| Bedtime (B) | Wake-up time (A) | P(A\|B) |
|-------------|------------------|--------|
| 10:45 PM | 7:00 AM | 1.0000 |
| 11:00 PM | 7:00 AM | 0.5000 |
| 11:00 PM | 7:15 AM | 0.5000 |
| 11:15 PM | 7:15 AM | 1.0000 |
| 11:30 PM | 7:30 AM | 0.5000 |
| 11:30 PM | 7:45 AM | 0.5000 |
| 11:45 PM | 7:15 AM | 0.2500 |
| 11:45 PM | 7:30 AM | 0.5000 |
| 11:45 PM | 7:45 AM | 0.2500 |
| 12:00 AM | 7:15 AM | 0.3333 |
| 12:00 AM | 7:30 AM | 0.3333 |
| 12:00 AM | 8:00 AM | 0.3333 |
| 12:15 AM | 7:15 AM | 0.3333 |
| 12:15 AM | 7:30 AM | 0.3333 |
| 12:15 AM | 9:00 AM | 0.3333 |
| 12:30 AM | 9:00 AM | 1.0000 |
| 12:45 AM | 9:00 AM | 0.5000 |
| 12:45 AM | 9:15 AM | 0.5000 |
| 1:00 AM | 9:30 AM | 1.0000 |
| 1:15 AM | 9:45 AM | 1.0000 |
| 1:30 AM | 10:00 AM | 1.0000 |

## Discussion

As we can see, the analytical and experimental setups vary greatly.

An experimental setup may suffer from not having enough data, like the above experiment, or have some other kind of bias. However, an experimental setup may be an accurate description of what really happens.

An analytical setup may suffer from not being realistic or have unaccounted-for factors that are missed during analysis. However, an analytical setup may be more accurate in modelling a real-world example where the experiment is impossible to run.

For example, it is not truly the case that you are guaranteed to wake up exactly at 9:30 AM if you went to bed at 1:00 AM, as the experimental results show. It's probably closer to the 1/9 chance suggested by the analytical results.

The question is: **What is this modelling?**

If this is a prediction about tomorrow, then the analytical result may be more helpful, but the experimental data may give you a more realistic analytical model.