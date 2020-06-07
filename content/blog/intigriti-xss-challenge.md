+++
author = "Ryan Wise"
categories = ["InfoSec"]
tags = ["xss", "challenge", "bug bounty"]
date = "2019-09-02"
description = "I won one of Intigriti's XSS challenge and got a Burp suite pro license! ($400)"
featured = ""
featuredalt = ""
featuredpath = ""
linktitle = ""
title = "Winning Intigriti's XSS Challenge"
type = "post"

+++

## Intigriti XSS Challenge # 3

Intigriti put out their third XSS challenge recently in late August 2019. I decided to try my hand on it as I'm new to Intigriti's platform and bug hunting in general. The way it works is they put out an intentionally vulnerable [webpage](https://challenge.intigriti.io/3/) just waiting for your xss payload. Out of everyone who submits a correct submission they will randomly pick one  researcher and award them a one year Burp License and some private program invites.

After a few hours of trying different things I finally got it. It was a difficult but rewarding and fun challenge. So I did a quick writeup on their submission page and sent it off. Within a couple hours it was confirmed and that was the end of it.. or so I thought.

I woke up on September 2nd and I had a Twitter notification from Intigriti, I got selected as their one winner! It was awesome! Especially since I still didn't have a Burp Suite Pro License. Thanks again to Intigriti for giving back to the community and being awesome!

## Okay, Cool, but how?

Alright here is my writeup on how I tackled this challenge.

### Information Gathering

Upon visiting the page for the first time you are greeted with an image containing the JS the page uses and the general rules for the challenge. The JS was interesting to say the least.

``` html
<script>
  document.body.append(document.cookie);
  var source = new XMLSerializer().serializeToString(document);
  document.body.innerHTML = decodeURIComponent(source);
</script>
```

And the user's PHPSESSID cookie just dangling at the bottom

``` PHPSESSID=9ca3e188b91f6140323a987c00bc51c3 ```

From this we can tell it appends the user's cookie(s) to the end of the page and then proceeds to take the page's content and for some reason serializes and then deserializes it... Odd.

### Closing in

According to Intigriti's hints on [twitter](https://twitter.com/intigriti/status/1166309484328837121) it was a Chrome only XSS vuln which helps a lot to narrow down what we are looking for.

After wasting hours looking for Chrome XSS vulns on exploit-db, CVE, etc. I decided that probably wasn't the correct approach. So I moved onto comparing Chrome (which I never use) to Firefox (My 'daily driver' browser). I was pretty lucky and came upon a difference in the context menus when you right click on the page itself. Chrome has a "save as" option. So coupling that with Intigriti's hint of "200 likes, time for a new hint! When we say 'no self XSS', we do NOT say 'no obscure user interaction'". It seemed pretty clear what we needed to checkout next.

## The Attack

### Entry Point

When you save a page with Chrome's super handy feature you get a nice .html and folder downloaded to whereever you'd like. Upon opening the file after I saved it I noticed this comment in the body.

``` html
<body><!-- saved from url=(0033)https://challenge.intigriti.io/3/ -->
...
</body>
```

We are so close you can.. I don't know smell it?

### Payload Crafting

We just need an ending comment tag and a basic XSS Payload now to add to the end of our URL. In my case I just used this: ```--><img src=xss onerror=alert(1)>``` but that's not a valid URL. All that needs to be done is to go to a JS console and the url with our payload added on in the encodeURI() function. And we get this

``` js
encodeURI("https://challenge.intigriti.io/3/--><img src=xss onerror=alert(1)>");
// returns
"https://challenge.intigriti.io/3/--%3E%3Cimg%20src=xss%20onerror=alert(1)%3E"
```

### Win

Now just open in Chrome, save as a complete webpage and open locally and you should see a satisfying alert popup :)

![AlertImg](/assets/img/posts/intigriti-xss-challenge/alert.png)
