---
layout: post
title:  "Pavlov VR exploits"
date:   2018-12-16
excerpt: "Bottemless clip and no cock bolt action hack"
tag:
- Assembly
- Hacks
- Cheat Engine
- Exploits
comments: false
---

# Intro

[Pavlov VR](https://store.steampowered.com/app/555160/Pavlov_VR/) is a popular CS:GO like VR shooter, fast paced and fun. Currently it's one of the most popular VR shooters on Steam. That being said as far as I have been able to tell it has little to no anti-cheat. Which means no SBD, no defense for dll injection or modifying memory while the game is running. So for educational purposes I will be showing you how to do two little hacks that work in every game mode and server. (Do not hack in online games, I am not responsible for you getting banned plus cheating is for losers)

### Bottomless clip hack

You're going to need [Cheat Engine](https://www.cheatengine.org) installed for this. If you aren't familiar with Cheat Engine it's basically a memory scanning and debugging tool, not exactly user friendly but it's powerful. 

Start up Pavlov. Once it starts open Cheat Engine and attach it to the Pavlov.exe process. Walk over to the table in the spawn room and pick up your chosen gun and load it. Next switch over to Cheat Engine and hit new scan / first scan with a type of "Unknown initial value".  

<img alt="First Scan" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp1.png">

Now change Scan Type to "Value decreased by ..." and set the value field to one. Shoot the gun once and hit next scan, repeat this process untill there are only two values left that go down whenever you shoot the gun. 

<img alt="Finding the magazine values" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp2.png">

Once that's done correctly right click on both of the values and click "See what writes to this address" pick up the gun and shoot look for an instruction that appears when you shoot it, right click it and view in disassembler. It should look like the following.

<img alt="Finding the decrementing code" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp3.png">

If we look up a few lines we can see an instruction of "dec ax" it's a safe assumption to assume that this is what's reducing the value of the magazine, so we are going to right click it and hit "replace with code that does nothing" which will insert a bunch of nop (no operation) instructions in lieu of the decrement instruction. Now we should be able to tab back into the game and shoot guns as much as our heart desires. 

Here is a demo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NrzeNsQ_s_Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### No cock bolt actions

That last exploit was cool and all but I want a semi automatic .50 Cal to really get my point across, how do I manage that? It's actually a very similar process. What we have to do is check for a boolean wether or not a certain gun is cocked. (booleans are normally byte values with a range of 0 = false and 1 - 255 = true in most games, in Pavlov 0 is false and 1 is true which makes it easier). So we go back to the table and select a gun we want and load and cock it. Now we set up a new scan for an initial value of 1.

<img alt="Initial Scan for bolt action" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp5.png">

Now uncock the gun and set the value to 0 and hit next scan, cock it set the value to 1 and repeat until you only have a few values left. This is where it gets harder than the previous exploit, there will be 6-10 values that all seem correct. You're going to have to watch closely when you uncock or cock the gun to see what changes instantly. 

<img alt="Finding the decrementing code" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp8.png">

Once you believe you have that value start watching that address for writes. Now you want to watch for the write when you uncock the gun, this will give us a spot to stop it from ever writing an uncock action. From the time of writing the instruction that shows up will be "mov byte ptr \[rax+rdx\], 02" once we find it we replace it to code that does nothing (a bunch of nops). 

<img alt="Finding the decrementing code" src="/assets/img/posts/pavlov-vr-exploits/pavlovexp9.png">

Alright now we can go into our own little private match, buy the bolt action heavy rifle and go to town on some bots! 

Demo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/2ESwe8l_I88" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion

Note: every time the game restarts you will have to redo these exploits. You could make a modified .exe using another debugger such as OllyDebug but I'm not going to give a tutorial on that since I believe it has a higher chance of being abused. If you want to try it out go for it, I believe it would make a great learning experience :)

I will be writing Dave Villz to tell him that an anti cheat would be a great thing for this game or at least server checked values on multiplayer servers (that way we can still have fun offline ;) ) but for now use this only for educational purposes, cheating online isn't cool and just ruins the game for everyone. Good luck and have fun everyone!

### Update

So I contacted Dave concerning these glaring issues and let's say he was less than happy. He also grabbed my screen name off the video on this write up and banned me for playing against bots and doing this. I sent him this article which at the time was unlisted so can only be accessed directly by URL. After this reaction I made it public.

![TwitterChat](/assets/img/posts/pavlov-vr-exploits/davechat.png)

After I posted a Steam Review talking about his reaction, Dave said "He's not supporting PC anymore" in his Discord Server. 
[Imgur Link](https://i.imgur.com/NHZDVHK.jpg@)
