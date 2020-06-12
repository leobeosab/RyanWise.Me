+++
author = "Ryan Wise"
categories = ["Tools", "InfoSec"]
tags = ["Go", "Discord"]
date = "2020-01-24"
description = "Use Discord webhooks to notify you about automated scans from anywhere"
featured = ""
featuredalt = ""
featuredpath = ""
linktitle = ""
title = "Upgrading your Recon with Discord"
type = "post"

+++

## Discord

It seems like everyone is using Discord for communication, video games, streaming or something these days and they should. It's free, available on all your devices, has a great api and you can make bots and webhooks with ease!

We are going to be looking at the WebHooks feature of Discord today and how we can use them to up our recon game.

### WebHooks
Web hooks are an easy way to get data into a certain channel on Discord it's easy to integrate with services like Github and TravisCI. You generate a URL on Discord and send a post request to it with a content string and bam new message in the channel of your choosing.

## Recon + WebHooks = <3 

When it comes to passive recon for bug bounties the best approach is to have a set it and forget it attitude. If we have a script that runs everyday and scans for subdomains on yahoo or another program we don't want to check it manually everyday. It's much better to have it tell us if it found anything new. This is easy to do with Discord and best of all free.

First thing's first we need to create a WebHook find out how to do that [here](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks) 

### Calling your webhook
Calling a webhook is very simple we can do it from the command line using curl!
```
curl -d '{"content":"Hello, World!"}' -H 'Content-Type: application/json' https://[your webhook url]
``` 
![curl example](/assets/img/posts/recon-upgrade-discord/example_curl.png)

### Easier WebHooking
An easier method than using curl every single time we want to send a message in our scripts would be to create a little tool that does the calling for us. I wrote a little go script that will do this and you can find it below or in my [hacks repoistory](https://github.com/leobeosab/hacks/tree/master/go)

Couple of notes:
Go is a bit overkill for this but I like Go more than I like bash or python(no hate) and let's be honest Go scripts are cool

This could be simplified and we really don't need the json marshalling but I think it looks better and is a bit easier to read so ‾\\\_\(ツ)\_/‾

##### discordmessage.go
```golang
package main

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "log"
    "net/http"
    "os"
    "strings"
)

type Message struct {
    Content string `json:"content"`
}

func main() {
    // Discord Notification WebHook
    whurl := os.Getenv("D_NOTIFICATION_WH")

    c := strings.Join(os.Args[1:], "\n")
    m := &Message{
        Content: c,
    }

    j, _ := json.Marshal(m)

    req, err := http.NewRequest("POST", whurl, bytes.NewBuffer(j))
    req.Header.Set("Content-Type", "application/json")
    if err != nil {
        panic(err)
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    log.Println("response Status:", resp.Status)
    log.Println("response Headers:", resp.Header)
    body, _ := ioutil.ReadAll(resp.Body)
    log.Println("response Body:", string(body))
}
```
Now we can just
```bash
export D_NOTIFICATION_WH=[your webhook url]
go run discordmessage.go "Hello, World!" 

# Or get fancy and install
go install discordmessage.go
discordmessage "Hello, World!" # From anywhere as long as your gobin is in your path
```

### Practial Example
Aka very lazy but to the point example because I want to go play Call of Duty Modern Warfare

Let's say we have a script running `knock.py yahoo.com > subs.txt` everyday and everyday we check it to see if there is anything new. Well let's automate this checking with the following. 

```bash
#!/bin/bash

# Check if file exists
if [ -f yahoosubs.csv ]; then
    mv yahoosubs.csv yahoosubs.csv.old
fi

# Run knock py output csv file
knockpy -w wordlist yahoo.com -c
# Rename knockpy's csv output because I don't know of a flag to set the file name
mv yahoo_com* yahoosubs.csv

# If a old csv file exists run a diff on it
if [ -f yahoosubs.csv.old ]; then
    data=`diff yahoosubs.csv yahoosubs.csv.old`
    discordmessage "$data"
fi
```

Now if we run that script with our wordlist that just has mail, code, dev in it we will get results for those subdomains. To fudge our script finding new domains we are going to add finance to our wordlist. Which if all goes well should lead to this message in our Discord channel

![practical example](/assets/img/posts/recon-upgrade-discord/practicalexample.png)

Now this is a super simple example and so much more can be done for formatting and different kinds of scans. Follow my [github](https://github.com/leobeosab) and [twitter](https://twitter.com/ride_faster)
