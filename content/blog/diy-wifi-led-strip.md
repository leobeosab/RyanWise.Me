+++
author = "Ryan Wise"
categories = ["Hardware", "Smart Home"]
tags = ["Arduino", "ESP8266", "LEDs", "Gaming"]
date = "2020-07-28"
description = "Make your own Wifi enabled LED strip using open source software. This strip can be controlled by virtually any device in your home."
featuredpath = "/assets/img/posts/diy-wifi-led-strip"
featuredalt = "Demo gif"
featured = "demo.gif"
linktitle = ""
title = "DIY Wifi Smart LED"
type = "post"

+++

I setup an ESP8266 and WS2812B LED strip with [WLED](https://github.com/Aircoookie/WLED) and a while back and thought it was one of the coolest ways to control a smart light, that I've ever tried. WLED is a web server for ESP8266/ESP32 boards that controls NeoPIxel LED strips. There is an app that works out of the box for basic controls / effects. More importantly there is a REST api, and even better it allows for UDP communication for quick updates. 

## Part List

- [ESP8266](https://amzn.to/3jPbCnB) Node MCU x 3 $12.99 USD - Boards used for controlling the light strip, you don't need 3 but you can divide the LED strip up and have multiple and the price of one is only $2USD cheaper on Amazon
- [LED strip 144 LED](https://amzn.to/2BBLOKm)s $18.49 USD or [300 LEDs](https://amzn.to/3hKhA7l) $29.99 USD (more spread out though) - WS2812B led strips
- (optional) [Jumper Wires](https://amzn.to/2X3NkMS) $14.99 USD - If you don't want to strip wire or solder (not recommended)
- (optional) [Lever Nuts](https://amzn.to/3jOa11p) $18.99 USD - If you can strip wire but don't want to solder
- (SUPER optional) [Raspberry Pi Zero W](https://amzn.to/3g4Hp1A) $28.99 - If you want to use the Forza Tachometer but don't have/want a regular computer to run the server

All of these parts are affiliate links to Amazon, feel free to get them elsewhere but buying them from those links help support me :) 

## Flashing the firmware

For flashing I'll be using [esptool](https://github.com/espressif/esptool), you will need to have [Python](https://www.python.org/downloads/) 2.7 or 3.4 (or newer) installed first.

install esptool

```bash
pip install esptool
```

Download the binary from Aircookie's WLED project [here](https://github.com/Aircoookie/WLED/releases) you will want the one ending with _ESP8266.bin, assuming you're using the esp8266 and not the esp32. Once that's downloaded open up a terminal (or cmd/powershell in Windows) to the directory with the .bin file you just downloaded.

Connect the ESP8266 with a usb cable

Flash the firmware

```bash
esptool.py write_flash 0x0 [The bin file you downloaded]
#example [if you're on linux or MacOS you'll need sudo]
esptool.py write_flash 0x0 WLED_0.10.0_ESP8266.bin
```

If this method doesn't suite you, there are alternatives [here](https://github.com/Aircoookie/WLED/wiki/Install-WLED-binary) and [here](https://nodemcu.readthedocs.io/en/master/flash/)

## Wifi & App Setup

Using any Wifi enabled device connect to the WLED-AP network with the default password wled1234. Once connected open up a web browser to 4.3.2.1 or [http://wled.me](http://wled.me). 

Click the Wifi-Settings button and enter in your router's ssid and passphrase. If you have both a 5Ghz and 2.4Ghz network make sure to use the 2.4Ghz one. After applying the device should reset and connect to your network. If it doesn't connect there was an issue connecting to your network, double check the config :) 

<img alt="wifi setup in app" src="/assets/img/posts/diy-wifi-led-strip/app_wifi_setup.png" style="max-height: 380px; display: inline-block;"/> 
<img alt="customize light in app" src="/assets/img/posts/diy-wifi-led-strip/app_color.png" style="max-height: 380px; display: inline-block;"/> 

Now you can move onto configuring the device. There are a few ways of doing this, one is you can just open the IP of the device in your browser. (you can find it by downloading an app like [Fing](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjFmIyXmfHqAhVI2qwKHcqMBzEQFjAAegQIAxAB&url=https%3A%2F%2Fwww.fing.com%2F&usg=AOvVaw1_5RHb-3nk3gt1fBpEfpwv) or if you're savy, use nmap) The easier option is downloading the WLED app. [Android](https://play.google.com/store/apps/details?id=com.aircoookie.WLED), [iOS](https://apps.apple.com/us/app/wled/id1475695033). You just click the add button on the top right, click discover lights and once it discovers the light you are good to go. If this doesn't work you can try the other method as well. I found the app is reliable and easy but occasionally it won't detect them.  


From the app or browser you can click config → LED setup and tell it how many LEDs you have on your strip. 

## Wiring

Wiring this up is super simple, with the LED strip linked above it only has 3 wires. 5v, Data in and ground. Which means we only have 3 wires to connect!

| Wire  	| Function  	| Pin 	|
|-------	|-----------	|-----	|
| Red   	| Power(5v) 	| Vin 	|
| Black 	| Ground    	| Gnd 	|
| Green 	| LED Data  	| D4  	|

Example

![Wiring](/assets/img/posts/diy-wifi-led-strip/wiring.jpeg)

Once those are connected properly, plug your ESP8266 in and watch it light up! You can mess around and change the color in the app or browser! Or even use one of the cool palettes along with an effect. (I recommend the beach palette with the lake effect)

![Example basic lit LED strip](/assets/img/posts/diy-wifi-led-strip/example_lit.jpeg)

Bad image quality FTW

## Cool but what else? - RPM Meter (Tachometer) in Forza

<iframe width="560" height="315" src="https://www.youtube.com/embed/_tIw8-Gl2F4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I'm working on creating a few different projects using the UDP protocol for WLED, one I have completed is an RPM meter (tachometer) in Forza Horizon 4 (also works for Forza Motorsport 7). Forza has an option for remote telemetry which will ping a host on your network for telemetry data 60 times a second over UDP. 

So if we want our WLED strip to do this we need another host on our network different from the WLED board and our machine running Forza. This is only necessary because we are using WLED. If we didn't want an easy to use LED strip and just wanted an RPM meter we could make the board directly compatible with the packets from the Forza telemetry output. I'll put out some firmware that is compatible with the board directly to skip the man in the middle at a future date. 

### Software Setup

In order to set this up with the man in the MITM (man in the middle) approach, we need some computer (I use a raspberry pi) to run the program that will forward the LED info to the WLED board.  You can find it on my Github [here](https://github.com/leobeosab/WLEDWhisperer). This is written in GoLang so it SHOULD work on any machine. If there is any issue feel free to make an issue on Gitub, email me directly or DM me on Twitter. 

**Installing the software**

Go to my [Github releases](https://github.com/leobeosab/WLEDWhisperer/releases/tag/0.1.0) and download the Forzatachometer for linux or Windows. Windows has the .exe, I should change the name to include the platform but I'm lazy. 

Start by making sure you have a firewall rule to allow UDP on port 8080 on your computer. If you're using Linux & iptables you can use the following command: 

```bash
sudo iptables -A INPUT -p udp --dport 8080 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
```

This shouldn't be necessary for Windows because it should ask for permission when it's ran but if you're running into issues check [here](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwipgamim-_qAhXZZs0KHb2ODqsQFjAQegQIAxAB&url=https%3A%2F%2Fwww.tomshardware.com%2Fnews%2Fhow-to-open-firewall-ports-in-windows-10%2C36451.html&usg=AOvVaw0kfu3YqpkI-VyXWrGBCHjV).

Open up a terminal or cmd instance (Powershell has issues with the Go flags) in the directory where you downloaded the software.

Now you should be able to start the server 

```bash
forzatachometer -host-ip=[YOUR IP ADDRESS] -wled-ip=[YOUR LED STRIPs IP] -led-count=[NUMBER OF LEDS IN YOUR STRIP]
#example linux
forzatachometer -host-ip=192.168.1.131 -wled-ip=192.168.1.150 -led-count=144
#example windows
forzatachometer.exe -host-ip=192.168.1.131 -wled-ip=192.168.1.150 -led-count=144
```

Once the server is up and running go ahead and give it a test. Put the IP address of the MITM computer into Forza and the port for it to send the data to (default is 8080). Once you get into a car and start driving it should reflect the RPM on the LED strip.