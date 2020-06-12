+++
author = "Ryan Wise"
categories = ["Tools", "Hardware"]
tags = ["arduino"]
date = "2020-06-11"
description = "Use 0s and 1s to type like the most elitest keyboard user ever"
featuredpath = "/assets/img/projects"
featuredalt = "Binary Keyboard"
featured = "binary_keyboard_new.jpg"
linktitle = ""
title = "Binary Keyboard Project"
type = "post"

+++

## A what?

This is probably one of my most useless creations. It's a 2 key keyboard for the most tedious typing experience ever. Basically you type in 8 bits on once you hit the 8th one it will take the value of the byte and put the corresponding ascii code and output it to the connected computer. As an example:

```
01100001 = a
01100010 = b

00001000 = backspace
```

## How to build

This is built pretty easily with an Arduino micro, 2 buttons( I used Cherry MX keyswitches) and an OLED(optional) display. The code is [here](https://github.com/leobeosab/binarykeyboard). Download the code and map the the pins for I2C control (2&3) to the oled and 4+5 to the buttons and it will just work. It's super simple. 

A step by step guide will also be up once I get some more parts in for a second one 

## The case

The case was built with fusion 360 and I will upload the STL files very soon (they need to be tweaked). After the case was modeled it was printed on my [Ender3](https://amzn.to/2YnpGuG) 3D printer and assembled with M3x6mm screws. The bottom took 5 hours and the top took an hour. I'm considering selling the cases and whole finished project on Etsy.

## Future Plans

The current design looks good in my opinion but I'm going to get a PCB made for a more professional look and feel. The only other improvement I'm currently considering is possibly and aluminum case? Depending on the cost of it of course :) 

## Previous build from 2017

I made something very similar to this a few years ago and it looked nowhere near what it does now. Just thought it would be cool to look at the progress from then to now

![/assets/img/projects/binary_keyboard.jpg](/assets/img/projects/binary_keyboard.jpg)
