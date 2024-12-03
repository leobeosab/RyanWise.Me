+++
author = "Ryan Wise"
categories = ["Tools", "Hardware"]
tags = ["arduino", "keyboard"]
date = "2023-11-20"
description = "Bombers aren't flying overhead, but we can type like it"
featuredpath = "/assets/img/projects/morse keyboard"
featuredalt = "Morse Keyboard"
featured = "morse_featured.jpeg"
linktitle = ""
title = "Morse Keyboard"
type = "post"

+++
# Efficiency 
That's what this is. 1 Key all the combinations. Is there any reason to even use a 100% keyboard anymore? I feel the 1% keyboard is going to revolutionize home computing! 

On a real note, this keyboard was a blast to make. Morse code is harder than I'd like to admit but it functions pretty well I think! I made this curious little keyboard as a response to yet more requests from my binary keyboard video.

This 1 key keyboard is typed on using morse code via straight keying. It has support for all normal ascii characters as well as some modifiers.

{{< video "../../assets/img/projects/morse keyboard/morse.webm" >}}


# The Code
Touching briefly on the code which is, by all means, hot garbage. But I did want to mention the way I'm translating morse -> keycodes and keeping track of that. 

### Morse Code
For this to make sense here is a quick run through on morse code. There are 3 "inputs" in morse: dits (aka dots represented as . ), dahs (aka dashes represented as -) and no input. Morse being time based means no input is an input. 

dits are a short press on the key and dahs are a long press on the key (usually 3x as long as a dit)

Characters are just made up of dits and dahs ie a which is .- but how do I know the character is done? We wait approximately 1 dit worth of time and that signals the end of a character. What about words? Words are still waiting but usually 3 dits worth of time.

### Tracking and converting morse code
While brainstorming how to keep track of the dits and dahs and convert them into their corresponding characters. I briefly toyed with the idea of using an integer and bit-shifting to track the dits and dahs. For example

* A could be 1
* B could be 1000
* C could be 1010
* E could be 0
![](assets/img/9ce870ce0a04afaf478f915526198f97_MD5.jpeg)
but this doesn't work when we get to fun characters like H which is 0000 so how would we track that? Maybe start the integer off at 1 and bitshift left each time hit the key? Or create a struct that has the code and character attached to it and a map linking them?

I went for a weird approach. I still wanted a simple primitive datatype to store the current character and map in. So keeping with the single integer for tracking the value, I decided on a 2 dimensional int array for the keymap. 

The idea was to modify my binary idea from earlier but have a different keymap for values for every set of characters that required the same number of inputs (dits or dahs) ex:
```C++
const int KEYMAP[6][64] = {
  // 1 bit maps
  {
    (int)'e', (int)'t'
  },
  // 2 bit maps
  {
    (int) 'i', (int) 'a', (int) 'n', (int) 'm'
  },
  // 3 bit maps
  {
    (int) 's', (int) 'u', (int) 'r', (int) 'w',
    (int) 'd', (int) 'k', (int) 'g', (int) 'o'
  },
  // 4 bit maps
  {
    (int) 'h', (int) 'v', (int) 'f', -1,
    (int) 'l', -1, (int) 'p', (int) 'j',
    (int) 'b', (int) 'x', (int) 'c', (int) 'y',
    (int) 'z', (int) 'q'
  },
  //....
```

This way we can still map the values by just using bit shifting. Say I want to type in A so I enter in a dit followed by a dah: .- this corresponds to 01 or just 1. We look up in the keymap like: `KEYMAP[NUMBER_OF_INPUTS][VALUE_OF_INPUTS]`
which in this case would be `KEYMAP[2][1]` because we entered 2 dits or dahs and they resulted in 01. We would now get the int keycode for a as a result!

Actual code ex:
```C++
// Set preview letter for display
// letterIndex is current number of inputs+1
// letterState is the bitshifted number
char preview = ' ';
if (letterIndex >= 1) {
	preview = (char)KEYMAP[letterIndex-1][letterState];
}
```
# The Case
The case was designed completely in onshape the cad tool a browser. Can't recommend onshape enough for that, no installation or hassle. Not sponsored I just like the product. If you'd like to export it or derive your own in onshape here is the [link](https://cad.onshape.com/documents/5863b492cb5b8630d17c5687/w/4e979c74fb0be31e750d7e5b/e/9ef7c2ed62595d317a30ba48?renderMode=0&uiState=6562fb836452f42a0d073ba5).
[morse keyboard case](../../assets/img/projects/morse%20keyboard/morse_case.jpeg)


![](../../assets/img/projects/morse%20keyboard/morse_case.jpeg)
# Make one / Contribute
If you'd like to make your own or contribute feel free to do so [here](https://github.com/leobeosab/morsekeyboard)!  