---
layout: post
title:  "Lambda S3 Website Auto-Updater"
date:   2019-05-15
excerpt: "Whenever a push is made to my website repo, this Lambda function updates my website with the build"
feature: assets/img/projects/aws+github.png
project: true
comments: true
tag:
- S3
- Github
- Python
- Lambda
- AWS
---

# Updating an S3 bucket with Lambda

## Why
I got tired of having to take my build directory and manually put it in S3, make it public and create a fucking CloudFront invalidation everytime I wanted to make a little change to my website [I'm very lazy]. In addition to the fact I could make a post about it and learn more about interacting with S3 services from within Lambda.

## How
Code and ~~cocaine~~ **coffee**, how else?

This is just a basic AWS Lambda function wirtten in Python 3.7 using no extra libraries not included with Lambda's runtime. Everytime someone pushes to my website repo Github sends out a PUSH event using a [Webhook](https://developer.github.com/webhooks/) which hits an API published on AWS' API Gateway activating said lambda function. 

All this code does is download the zip file of the repo (it's gotta be public or you'll have to handle some auth stuff), Go through each file and check if it's part of the build directory (there are better ways of doing this, I'm lazy), upload each file to S3, and finally create an invalidation in Cloud Front so it doesn't show cached files. Feel free to take this code and use it however the hell you want. License: [WTFPL](http://www.wtfpl.net)

## The Code + Github link 
[Github](https://github.com/leobeosab/AWSAPITools/tree/master/functions/PortGitToS3)

``` python
from urllib.request import urlopen
import json
import zipfile
import boto3
import io
import time
import mimetypes

def getFileFromGit():
    return urlopen("https://github.com/leobeosab/RyanWise.Me/archive/master.zip").read()

def invalidateAllCFFiles(fileList):
    distID = "E8G7ATUPBJEIE"

    cloudFrontConn = boto3.client('cloudfront')
    cloudFrontConn.create_invalidation(
        DistributionId=distID, 
        InvalidationBatch={
            'Paths': {
                'Quantity': len(fileList),
                'Items': fileList
            },
            'CallerReference': 'Lambda:'+ str(time.time())
        })

def uploadZipToS3():
    s3Target = 'ryanwise.me' #bucket name
    buildFolder = '/_site/' #build subdir

    s3 = boto3.client('s3')
    
    putObjects = []
    fileList = []
    with io.BytesIO(getFileFromGit()) as tf:
        tf.seek(0)
        with zipfile.ZipFile(tf, mode='r') as zipf:
            for file in zipf.infolist():
                filePath = file.filename
                filePath = filePath.split(buildFolder)
                if len(filePath) != 2 or len(filePath[1]) == 0 or filePath[1].endswith('/'): 
                    #We only want the _site/* files with no path before it
                    continue

                fileName = filePath[1]

                #Guess the mime type
                mimetype, _ = mimetypes.guess_type(fileName)
                if mimetype is None:
                    mimetype = 'binary/octet-stream'

                putFile = s3.put_object(Bucket=s3Target, Key=fileName, Body=zipf.read(file), ACL='public-read', ContentType=mimetype)

                fileList.append('/' + fileName)
                putObjects.append(putFile)
                print(fileName)

    if len(putObjects) > 0:
        invalidateAllCFFiles(fileList)
        return "Success!"
    else:
        return "Error"

def handle(event, context):

    body = ""
    statusCode = 200

    try:
       body = uploadZipToS3() 
    except Exception as e:
        statusCode = 500
        body = "\n" + str(e)

    return {
        'statusCode': statusCode,
        'body': json.dumps(body)
    }
```

## Follow me
Follow me, my friends, dumb memes, interesting tech topics and way too much car stuff. 

Github [@leobeosab](https://github.com/leobeosab) & Twitter [@ride_faster](https://twitter.com/ride_faster)