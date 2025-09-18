---
title: Lab 04. Telemetry
draft: true
---

## Overview
[Link to Lab 04](/labs/lab04)

This lab is our introduction to telemetry, which was not part of the curriculum last year. Therefore, it might not go very smoothly, so be prepared to reduce the stress of students and communicate with me about how difficult things are.

My hope is that the major ideas that we really focus on are as follows:
- Getting encoder data from the wheels
- Recording logs on a remote machine such as our laptops and inspecting them
- "Remote" control, i.e., driving the robot from the computer


## Materials and Prep
Since you haven't learned this yourself, do follow through the full lab on your own. You should be confident in wiring an encoder, making a telemetry system, making a remote control system, and potentially even doing some Bluetooth control. This is harder than it seems, even with pre-made code.

For example, string processing can often go wrong on Serial monitor, and requires a lot of configuration. If people are just copy-pasting code, it might not seem obvious what the communication problem is. If you haven't encountered some of the problems yourself, you might also be stuck.

However, we can let this be a learning process as well. We're trying something new with new hardware, and it's always a bit rough.


## TODOs
1. Get them into their project groups.
2. Inform them of post-mortem procedures.
3. 

## Slides

Generate slides using [Marp](https://github.com/marp-team/marp-cli). If you're using the CLI, save the following to `lab04.md` and run `marp lab04.md`.


```mdx
---
theme: uncover
---
# Get into your robot groups
Start discussing your group work agreement until everything is settled. Then we'll explain the lab, then you can finish your agreement.

---
# Post-mortems and Lab Marks
Everything needs to be handed in the night before lab (so we can review and prepare for labs). Then we will do post-mortems:
- Everyone says one new thing that worked well about working together this week.
- Everyone says one new thing that didn't work well about working together.
- Everyone says how they contributed to the project.
We'll start post-mortems week after next. If people haven't contributed for non-honourable reasons, they may face consequences.

--- 
# Group Work Agreement
- Choose a meeting time outside of lab or lecture hours
- Determine a communication policy (e.g., response time, method)
- Agree on roles and responsibilities (everything can be renegotiated)
- Decide what to do when conflict arises

---
# The Teaching Team's Response to Conflict
Conflits happen. The best plan is to plan for conflict. Decide what to do right now, including consequences for non-communication and not taking responsibility. We can help people work out problems, but they have to want to work things out.

The teaching team will simply split up groups that cannot get along or work things out. People who do not communicate or contribute will be removed from a group. It is plagiarism to pass off group work as your own. All subgroups or individuals removed from groups are fully responsible for completing the lab work on their own. 

---
# Chassis and Motor Build
Start by building the chassis and motor. You may want to create test and demo motor builds to ensure you can drive one motor at a time.

---
# Rigourous Test Suite
You are being marked on your ability to come up with a rigorous and creative way to demonstrate and test your robot's driving abilities. Think about it like planning for the future failure of your driving system.

```