+++
author = "Ryan Wise"
categories = ["Bots"]
tags = ["python", "aws", "ec2"]
date = "2018-09-03"
description = "AWS EC2 Discord Bot for controlling EC2 instances"
featuredpath = "/assets/img/projects/"
featuredalt = "Binary Keyboard"
featured = "discord_bot_feature.jpg"
linktitle = "Github"
link = "https://github.com/leobeosab/AwsEc2DiscordBot"
title = "AWS EC2 Discord Bot"
type = "post"

+++

This is the first step I've taken in messing around with the AWS boto SDK for Python 3. I decided to use this SDK and Discord's Python library to solve an issue I've been faced with recently. I have had a couple pals of mine playing on a Feed the Beast server on an AWS medium EC2 unit, which gets expensive when not turned off. So everytime someone wanted to play they would message me and I would turn the server on and when no one was on I would turn the server off. Now this works but if I'm not available either a friend doesn't get to play or the server just sits racking up hours. 

To solve this I decided to write a Discord bot that can control the basics of EC2 instances that are tied to an AWS account. The current working version I have has 4 commands and as of now can only control one instance; I plan on fleshing it out more as I get the time. The bot can stop, start, reboot and give the status of the instance. This means even if I'm not around anyone on Discord server can turn off the EC2 instance or start it at their leisure. Making sure I don't have to be around all the time or give out my AWS credientials to anyone.