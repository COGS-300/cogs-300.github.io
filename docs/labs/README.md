---
id: index
position: 1
title: Labs Overview
slug: /
---

![](/img/arduino.svg)


In the COGS 300 Labs, you will be using the [Arduino](https://www.arduino.cc/) development platform. Arduino is a widely-adopted and mature internet-of-things (IoT) prototyping board. We will be using the [Arduino Uno R4 Wifi](https://store.arduino.cc/products/uno-r4-wifi) for this course. See the [documentation for the Uno R4 Wifi](https://docs.arduino.cc/hardware/uno-r4-wifi/) for a description of pinouts, tutorials, example code, and more.


## Journey from zero to robot
The labs will progress you from learning basic circuits to making an autonomous robot that will compete in a final tournament. The tournament will be an obstacle course where your robot must autonomously navigate through two mazes and find a goal. Winner of the tournament will be the robot with the goal-finding time.

Many people starting COGS 300 balk at the idea that they can build a robot. They may not consider themselves engineers, believe they are bad at coding, are no good at math, etc. Our experience is that everyone (yes, even you!) can indeed learn to build and program a robot by the end of the course. Many people from the Arts are surprised at how well they can do! I have heard many times during office hours how someone can't believe they built a robot. It will happen for you, too, if you put in the time.


## Coding and Circuit Building
This course will mainly use the [Arduino IDE](https://www.arduino.cc/en/software), which uses [C++](https://isocpp.org/). You do not need to be experienced at C++ programming to start the course, but you will want to become familiar with the [basics of reading and writing C++](https://www.w3schools.com/cpp/cpp_intro.asp) if you have come from another language (like [Racket](https://racket-lang.org/) or [Python](https://www.python.org/)). Since this is not a coding course, we will be giving only limited instruction in C++ (however, we will provide many working code examples).

You will also need some method of communicating between the Arduino and your computer. You can use the [Processing.org IDE](https://processing.org/download), a Java-based IDE that looks and feels very similar to Arduino. We will also use pre-written Python examples, available on the [COGS 300 GitHub page](https://github.com/COGS-300).

For those who want to engage at a more advanced level, you are welcome to use any machine learning (ML) framework that you want to guide your robot. We will teach only a limited version of ML in the class so that it is possible for beginners to feel confident. However, you are encouraged to use any ML resources and build the most intelligent robot you can.


## Marking and Structure
Each lab has preparatory work that you should do ahead of time called the "pre-lab". There will usually be some video content, some coding content, and some conceptual content. The pre-labs are not marked, but they are highly recommended to have a good experience in your lab.

During the lab, you will have tasks that you need to complete and show your TA. They are designed to be challenging enough to keep you focused during lab, but not so challenging that you cannot complete them. If you are having difficulty completing them, that's a perfect time to ask for a lot of help from the TA. In this course, your TA is there to help you, not to test your knowledge. All questions are encouraged.

At some point during the lab, the TA will visit your group and ask you to show you the creative work from the previous lab. At this time, they will also go through a **post-mortem** with you. It is important that you take the post-mortem seriously and be honest during them. There will be _some_ critique, but more importantly, it is a time to talk about difficulties working during the week, and to debug problems both with your robots and your group working structure. Everyone will be required to:
- Say one thing that worked well about working together this week.
- Say one thing that you, personally, accomplished with regards to your group work.
- Say one thing that did not work well about working together this week.

This is designed to get you talking about problems early and often. Nobody is allowed to not talk, everybody has to say one thing positive—and negative. No system is perfect; even if the week went really well, that's the perfect time to practice saying difficult things.

After the lab, you will have homework that you need to complete before the next lab. Usually, there will be a creative component, i.e., you'll need to do something that is _beyond_ the minimum stated requirements to get full marks. Students sometimes find this ambiguity to be difficult. The point of this is not to make your life stressful or to have an unobtainable high bar, but simply to show that you have understood the lab work enough to extend what you've learned into new areas. Usually, when students run their ideas by me, most people's first creative ideas are wonderful and good enough to get full marks easily.

- 5: Exceptional demonstration of lab concepts (exceeds requirements)
- 4: Good demonstration of lab concepts (meets requirements)
- 3: Reasonable demonstration of lab concepts (one or two requirements unclear)
- 2: Missing one or two lab concepts
- 1: Missing most lab concepts
- 0: No attendance/no completion

### Attendance
Attendance at labs is **mandatory**. If there is a very exceptional instance where you cannot attend, you must inform your **TA and group members** _well ahead_ of the lab so that alternate plans can be made. This applies to group meetings and outside of class communication as well. You are required to be reachable, communicative, and present.

We do not especially require doctor's notes, unless there starts to be an ongoing issue. Then, you should apply for academic concessions through your faculty and contact [COGS advising](https://cogsys.ubc.ca/advising/).

## Materials
Some materials are provided, and some materials you will be required to purchase. Our local electronics store, [Lee's](http://www.leeselectronic.com/) is our preferred provider (i.e., we ask them to stock materials), but they are not the cheapest. Cheap is not always better: buyer beware.

### Purchase these yourself
#### 1 x Arduino Uno R4 Wifi
We only officially support the [Arduino Uno R4 Wifi](https://store.arduino.cc/products/uno-r4-wifi). You can use other, similar, cheaper boards at your own risk. Course staff will not help you debug problems that are unique to a knockoff board.

The Arduino Uno R4 Wifi was chosen because:
- It allows for wireless communication between boards and computers
- It balances price and quality, so that we do not spend unnecessary time debugging
- It is designed to be very beginner-friendly and widely available (i.e., vs. a [Raspberry PI](https://raspberrypi.com))
- There is a huge user support community, and many, many, many tutorials available

If, for example, you want to use a cheap [ESP32](https://www.espressif.com/en/products/socs/esp32), we will not stop you. However, we can't help you much either. 

:::tip[ESP32]
The R4 actually includes an ESP32 module!
:::


#### 1+ solderless breadboards
A [solderless breadboard](https://en.wikipedia.org/wiki/Breadboard) is a helpful prototyping device that allows you to connect circuit components without [soldering](https://en.wikipedia.org/wiki/Soldering), i.e., permanently joining wires. You need to purchase at least one medium-sized breadboard for use in lectures, but you may need to purchase more. A limited number of breadboards are available in the lab supplies.


#### A variety of jumper wires 
You will need to purchase a good amount of [jumper wires](https://en.wikipedia.org/wiki/Jump_wire) (at least 10 each of male-male, female-female, and female-male). These are used to connect the different components to your Arduinos. 


#### 5+ Visible LEDs of any colour
The most basic output device for an Arduino is an [LED](https://en.wikipedia.org/wiki/Light-emitting_diode). You will be using these particularly in the beginning of the course as indicators (i.e., is this on? Does this work? Is there power). But they are also helpful for illuminating the ground for line-following challenges. A variety of colours is nice, make sure some are white.

You can also get invisible IR LEDs, but they will only be useful later in the course.


#### 2+ Photoresistor 
A [photoresistor](https://en.wikipedia.org/wiki/Photoresistor) is a component that changes resistance according to the amount of light that enters it. They are useful for detecting ambient light changes, and are used for line-following tasks.


#### 3+ IR sensor modules
An [IR Sensor Module](https://circuitdigest.com/microcontroller-projects/interfacing-ir-sensor-module-with-arduino) can be used for distance sensing or sensing reflectivity. They use invisible [infrared light](https://en.wikipedia.org/wiki/Infrared). Some people prefer these for line-following.


#### 4+ Rechargable AA batteries
The most common debugging problem with the robot is power issues. You will need at least one independent power source for your robot, and the most common and useful will be a recharable [AA battery](https://en.wikipedia.org/wiki/AA_battery) pack. You should feed an absolute maximum of 12V into your robot, so you could buy as many as 8 AA batteries. _Note: you can use bigger batteries, different packs, etc., but do not use standard 9V batteries to power your robots, they will run out quickly._


### Lab will provide

#### Ultrasonic distance sensors
An [ultrasonic distance sensor](https://howtomechatronics.com/tutorials/arduino/ultrasonic-sensor-hc-sr04/) uses soundwaves (higher than you can hear, so "ultra" sonic) to bounce off of objects and detect distances. It is basically just high-pitched [sonar](https://en.wikipedia.org/wiki/Sonar). We will provide enough for each robot team to have 2-3, but not enough for each student to have one. If you want your own to take home, you will need to purchase one as well.


#### Motor driver
We use both the [HG7881 and L9110 motor drivers](https://electropeak.com/learn/interfacing-l9110s-dual-channel-h-bridge-motor-driver-module-with-arduino/?srsltid=AfmBOooTazlWPp54KU-xuUg3WEMewrzkuiFLbcByq6Cfxk2WuwbHKjwH) in our lab. We can provide 1-2 to each robot team. If you would like one to take home, you will need to purchase it yourself.

:::danger[Motor driver voltage]
Make sure you only use 12V or less for the motor drivers.
:::


#### Yellow gearbox motors
We use [12V TT Yellow Gearbox motors](https://einstronic.com/product/tt-motor-yellow-geared-dc-motor/) for our robots. Some students prefer to use better motors. You are welcome to use any driver/motor combination that you would like, however, you will need to supply it yourself. You can technically outfit these with an [encoder](https://en.wikipedia.org/wiki/Rotary_encoder) if you want to see how far your wheel has turned.


#### Robot chasis, hardware and wheels
The rest of the robot body will be provided by the lab. You may consider whether you want to improve the robot body. Unfortunately, the COGS Lab does not have maker equipment such as laser cutters and 3D printers, but there are plenty of places in Vancouver and on-campus that can provide those items. You're welcome to improve whatever you would like on the robot body, as long as it is built by you, yourself, and still can complete the tournament.

#### Tools 
The lab has a variety of hand tools, crafting supplies, and [multimeters](https://en.wikipedia.org/wiki/Multimeter). You may also consider purchasing your own.

:::tip[Toolkit]
Getting your own small toolkit will help you to work on circuits at home.
:::

## Circuit diagrams: TinkerCAD and Fritzing
Where possible, we will use [TinkerCAD](https://tinkercad.com/) interactive circuit simulator for diagrams. Since not all of our parts are available on TinkerCAD, we may also use [Fritzing](https://fritzing.org/) diagrams. They'll be free to view, but if you want to create your own, you will need to pay a small amount to use Fritzing.

## Teaching Notes and Concept Library
Where possible, all of the course concepts will be documented in the [Concept Library](/docs/concepts). Most teaching activities will include [Teaching Notes](/docs/concepts/teaching). These are provided for course staff to review. Students are welcome to read them, but it may be better to simply follow the lab/lecture instructions and experience the concepts first before getting too deep on the details.

_See [Teaching Notes](/docs/concepts/teaching/labs) for more details._