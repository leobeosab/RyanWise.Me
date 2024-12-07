+++
author = "Ryan Wise"
categories = ["Tips"]
tags = ["swift", "iOS", "xcode"]
date = "2019-07-22"
description = "Don't upgrade that mac!"
featuredpath = ""
featuredalt = "Problem image"
featured = "/assets/img/posts/deploy-to-new-devices-xcode/header.png"
linktitle = ""
title = "Deploy to new devices with old XCode!"
type = "post"

+++

## The Problem
"Could not locate device support files"

I've been trying to get my 2011 iMac to run a project on my newer iPad Pro running iOS beta 13.0 and everytime I'd go to build it would say "Could not locate device support files..." and just list some version number then fail. This error can be fixed one of two ways the first would be to update to the latest copy of XCode but this isn't always possible. Apple stops supporting versions of MacOS pretty quickly the once new High Sierra can no longer download the latest version of XCode-beta v11.0.

## Getting the Required Files

This is pretty easy, grab them from a newer mac running the latest version of XCode located at `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/`. Or if you don't have a newer mac laying around this [Repository](https://github.com/filsv/iPhoneOSDeviceSupport) will probably have the ones you need.

Once you have the files just drop the folder (or unzip the folder) into the XCode install you want to run example:

 ```/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/```

now restart XCode and give it a go!

### Side Note (dyld: Library not loaded: @rpath/libswiftCore.dylib)

If you see the error above go to Build Settings (make sure All is selected) and change Always Embed Swift Standard Libraries from No to Yes. Now clean and try again!
