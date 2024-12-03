+++
author = "Ryan Wise"
categories = ["Tools", "Hardware"]
tags = ["arduino", "keyboard", "pcb"]
date = "2023-01-02"
description = "Use 0s and 1s to type like the most elitest keyboard user ever"
featuredpath = "/assets/img/projects/binary keyboard"
featuredalt = "Binary Keyboard"
featured = "binary_keyboard_main.jpeg"
linktitle = ""
title = "Binary Keyboard"
type = "post"

+++

## A what?

This is a fun desk toy that could have use as a macro pad if you mapped macros to the 8 bits. It's a 2 key keyboard for the most tedious typing experience ever. The keyboard will have you type 8 bits, on the 8th bit entered it will send the connected computer the correlated ASCII code. Thus being a technically fully functioning keyboard using 2 keys.

```
01100001 = a
01100010 = b

00001000 = backspace
```

## How to build

This is built pretty easily with an Arduino micro, 2 buttons( I used Cherry MX keyswitches) and an OLED(optional) display. The code is [here](https://github.com/leobeosab/binarykeyboard). Download the code and map the pins for I2C control (2&3) to the OLED and 4+5 to the buttons and it will just work. It's super simple. 

### Part list with links

- [Arduino Micro](https://amzn.to/2YGlE0P) (Not the pro micro)
- [OLED Screen](https://amzn.to/3cX4bGl)
- [Green MX Switches](https://amzn.to/3f8YsyK)

## The PCB
The PCB was designed using EasyEDA, this was my first PCB design. I've done more since but this was a good starting point with no extra external components and just making connections.
![PCB image](../../assets/img/projects/binary%20keyboard/binkeebpcb2.png)

## The case

The case was modeled in Onshape, it's VERY simple and was attached with hot glue, I'm going to update it to just clip to the binary keyboard. [Here](https://cad.onshape.com/documents/42e5bccf31b5981d8c058959/w/61b83b74ed54f1bbbaa18a41/e/b39b02a284b23861a57fb298) is the link if you'd like to try to modify it. 
![](../../assets/img/projects/binary%20keyboard/binkeebcase.png)
## Future Plans

I'm making a new PCB at some point without using an Arduino board and just embedding the micro controller on the PCB itself. 

## Previous Builds
I have now gone back and remade this project a few times over about 7 years. It's a simple project that I love to come back to with new skills I've learned and see what can be improved.


Version 1 when I got my first 3D printer
![version1](../../assets/img/projects/binary%20keyboard/binary_keyboard_older.jpg)

Version 0 from around 2016 right after I graduated High School:

![assets/img/projects/binary_keyboard/binary_keyboard.jpg](../../assets/img/projects/binary%20keyboard/2017_binary_keyboard.jpg)
