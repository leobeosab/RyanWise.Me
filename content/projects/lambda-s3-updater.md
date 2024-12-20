+++
author = "Ryan Wise"
categories = ["Bots"]
tags = ["python", "aws", "ec2"]
date = "2019-05-13"
description = "Learn how to trigger a lambda that updates S3 whenever you push to your Github repo!"
featured = "aws+github.png"
featuredalt = "Binary Keyboard"
featuredpath = "/assets/img/projects"
linktitle = "Github"
link = "https://github.com/leobeosab/AwsEc2DiscordBot"
title = "Update S3 with lambda on Github Push"
type = "post"

+++
# Updating an S3 bucket with Lambda

## Why
This is useful for someone who wants more control over the traditional hugo deploy or wants code to run on merging pull requests. 

## How
Code and ~~cocaine~~ **coffee**, how else?

This is just a basic AWS Lambda function wirtten in Python 3.7 using no extra libraries not included with Lambda's runtime. Everytime someone pushes to my website repo Github sends out a PUSH event using a [Webhook](https://developer.github.com/webhooks/) which hits an API published on AWS' API Gateway activating said lambda function. 

All this code does is download the zip file of the repo (it's gotta be public or you'll have to handle some auth stuff). Go through each file and ensure it's part of the build directory (there are better ways of doing this, I'm lazy). Now upload each file to S3, and create an invalidation in Cloud Front so it doesn't show cached files. Feel free to take this code and use it however the hell you want. License: [WTFPL](http://www.wtfpl.net)

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
