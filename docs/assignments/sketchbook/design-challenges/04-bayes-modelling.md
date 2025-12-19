---
draft: true
---

# Model your life with Bayes

For this design challenge, you're being asked to model a part of your life using Bayes' theorem. You can use a single instance of Bayes' Theorem, or create a Bayes network. For either approach, the bulk of the work will be in establishing the connection to the part of your life that you're modelling, so one is not especially easier than the other.

For the single instance version, prepare a worked example (like we did in class) where each probability term is explained in detail, along with illustrations, explanations, models, and examples. For the following equation, clearly identify:


- A: the belief in question.
- B: the evidence that conditions your belief.
- P(A): the prior probability of your belief, including how you could both analytically and experimentally observe P(A).
- P(B): the prior probability of your evidence (independent of belief), including how you could both analytically and experimentally observe P(B).
- P(B|A): the probability of seeing your evidence given your belief is true, including how you could both analytically and experimentally observe P(B|A).
- P(A|B): the probability of your belief given your evidence, including how you could both analytically and experimentally observe P(A|B).

Substantiate your model with evidence. It's OK to estimate probabilities, but justify your estimates thoroughly. To ensure the robustness of your model, clearly demonstrate how parameters of the model impact your probability estimations. 

For example, if you're trying to calculate the probability of getting into grad school given certain grades, you should not just use all As (optimistic) or all Cs (pessimistic), but instead show at least both.

---
For the Bayesian Network version, you need to explain and justify your real-world example. However, the mathematics are taken care of for you (if you use a modelling program like [online.bayesserver.com](online.bayesserver.com), which is highly recommended). Instead, for each node in the network, you need to document, explain and justify the following:

- The real-world evidence for and meaning of each belief, including how you could both analytically and experimentally observe the probabilities of the belief.
- For each conditioning belief, how you could both analytically and experimentally observe the probabilities of the conditioning belief.
- Justifications for dependencies for conditions, i.e., why does each edge (arrow) in or out of a node make sense?
- Justifications for independent conditions, i.e., what are you either not including or not connecting, but could be considered to impact the belief network?

For example, in the Wet Grass example given in class, the Cloudy condition was given at 50-50, but is that realistic for Vancouver? Looking up real-world data, we could get a better estimate. Analytically, Cloudy could also be given as having more than two discrete states, since there are many types of clouds, and we could simply assign equal likelihood to each, or use prior real-world weather data to get estimates of each Cloudy state. Experimentally,  we do observations ourselves over time. Cloudy is likely appropriately conditioned on nothing, because the conditions would be almost entirely prior weather patterns that are too complex to model with this system, and have nearly nothing to do with Wet Grass. 

However, WetGrass could be conditioned on many other factors such as time of day, or whether there was an atmospheric river three days prior and the ground is still wet. Since the grass gets wet every day from dew in the morning, that should be modelled, but since the atmospheric river is pretty rare, it's not important to model it. If you were to submit a WetGrass example (which you cannot), you would need to account for TimeOfDay or a similar variable, then say how you could both analytically and experimentally determine it. Analytically, the grass should be wet any time dew forms, which according to the internet, is "when the temperature of a surface cools down to a temperature that is cooler than the dew point of the air next to it." Analytically, you could look up the numbers of these and make an estimate. Experimentally, you could you observe the grass for a year at each time of day. You don't have to run the experiment for this assignment.

---

## Design solution format and handin
For this design challenge, even if you use an online Bayes Network tool, draw the network or formula in your sketchbook, and sketch the real-world thing that your are modelling. Explain and annotate your formula/network, and draw an example of what it refers to.

Make a presentable, clean version in your sketchbook, reflect on the module and your learning, justify and give yourself a grade from 0-5. Upload a photo of your drawings and reflection and presentable version of the design challenge for review.

The reflection should be a paragraph or two on the course concepts, tying them into your personal understanding of the course. Include a short justification for the mark that you've given yourself in terms of your participation in class, engagement with the readings, and work on the design challenge.

The design challenge is due about two weeks after the assignment released (will be indicated on Canvas).