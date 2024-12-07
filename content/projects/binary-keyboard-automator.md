+++
author = "Ryan Wise"
categories = ["Hardware"]
tags = ["arduino", "hid"]
date = "2023-11-02"
description = "Binary keyboard too slow? Try this!"
featuredpath = "/assets/img/projects/binary keyboard"
featuredalt = "Binary Keyboardinator"
featured = "automator_feature.jpeg"
linktitle = ""
title = "Binary Keyboard Automator"
type = "post"

+++
# Why the hell would you make this
I posted a demo of my binary keyboard on TikTok and it took off surprisingly well. However a lot of people not clued into the fact that keyboard is a joke / desk toy. They said it wasn't efficient and is too slow. So I set about making a sarcastic ass answer to these problems. Here is the [Original Tiktok](https://www.tiktok.com/@convictcantaloupe/video/7284052067721710878?is_from_webapp=1&sender_device=pc&web_id=7305561525941929503)

![](../../assets/img/projects/binary%20keyboard/binary_keyboard_automator2.gif)

## Technical Overview
This is a fairly simple project, really it's just 2 solenoids controlled by a couple of MOSFETs reading a PS/2 keyboard. The PS/2 protocol is much simpler than USB, consisting of 11 bit frames containing:
1 start bit (always 0)
8 data bits
1 parity bit
1 stop bit (always 1)

So processing this using a ready made [library](https://www.arduino.cc/reference/en/libraries/ps2keyboard/) on an Arduino was easy. The solenoids are 12v generics from Amazon that I under-volted to 8.5v.