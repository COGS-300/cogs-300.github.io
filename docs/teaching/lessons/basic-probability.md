# Basic Probability

As mentioned in class, we will learned a bit of probability this term. The most basic formula is as follows:

$$
P(A) = \frac{\text{No. of outcomes for event A}}{\text{No. of possible outcomes}}
$$

As simple as this is, it can sometimes be difficult to really understand the meaning of this formula. The mathematical notation is a bit strange, and there are hidden senses of logical conditions. It's also hard to understand the scope. The best we can do is just practice with it for well-known items.

So, the analysis of probability for a coin to come up heads vs. tails would look like this:

$$
\text{Possible outcomes} = \{\text{heads}, \text{tails} \}
$$

Just by counting everything that is in our set of possible outcomes, we can figure out the bottom of the formula:

$$
P(\text{Coin = Heads}) = \frac{\text{No. of outcomes for Coin = Heads}}{2}
$$

Now, the coin coming up heads is merely one of the two outcomes:

$$
P(\text{Coin = Heads}) = \frac{1}{2} = 50\%
$$

But what does this mean practically? The statement technically means that a long process of flipping coins will tend towards a distribution that looks even. It will only very rarely truly be that exactly 50% of the events will turn up heads, it will that if we flipped the coin for long enough, in ideal conditions, we should see a distribution that approaches 50% for each outcome.

It's really important to understand that meaning behind the formula, particularly for robotics, because conditions are rarely ideal, and we don't have forever to test a probability. Instead, we say that the probability is a **model** of what we might expect to happen, but expectation doesn't mean "we're really, really confident", it means, we have this process in mind, and a betting person should be careful.

So, with probability, we're always asking the question: if conditions were ideal, how could we set up a game of counting the outcomes we care about over all the outcomes that are possible? The posing of the question is hard to translate into math. For example, if I said, what's the probability that a signal is `True` a priori, you might say:

$$
\text{Possible outcomes} = \{\text{True}, \text{False} \}
$$

$$
\text{Possible outcomes} = \{\text{True}, \text{False} \}
$$

$$
P(\text{Signal}=\text{True}) = \frac{1}{2}
$$
But post-hoc, you might be dealing with a real experimental dataset that looks like:

| Timestamp | Signal |
|-----------|--------|
| 00:00     | True   |
| 00:01     | True   |
| 00:02     | True   |
| 00:03     | True   |
| 00:04     | False  |

In that case, just by counting up the events as they occurred, the true experimental probability was:

$$
P(\text{Signal}=\text{True}) = \frac{4}{5}
$$

So, our model did not agree with our experiment. Was it a bad model? No! But it just didn't account for some experimental reality. In this class, I will usually try to differentiate when we're talking about the analytical vs. experimental probability, often asking for both.