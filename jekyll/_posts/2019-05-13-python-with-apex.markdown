---
layout: post
title:  "Up to Speed with Apex"
date:   2019-05-13
excerpt: "Setting up an AWS Serverless API with Apex [Node.js, Python and more!]"
tag:
- AWS
- Python
- Node.js
- Lambda
- Apex
comments: true
---

# Intro
Using this amazing tool I found called [Apex](https://apex.run) we will get a basic Python, Node.js, Ruby, etc AWS Lambda API running in minutes! I'll be using Python for this guide but it only takes 1 line of code to change the runtime you want :)

If you want to see a real world application of this kind of API see one of my projects [here](/lambda-s3-updater)

## Step One: Installing & Setting up AWS CLI + Apex
The easiest way to setup Apex is to use the AWS CLI, though this is completely up to you. Apex also allows configuration via Environment Variables, IAM roles and more.

So let's install AWS CLI

MacOS (My OS at the time of writing)
``` brew install awscli ```
<br>
Debian Linux
``` sudo apt-get install awscli ```

Run the command ``` aws configure ``` and fill out your credentials, if you don't understand what it's asking for go to the IAM Management Console on your AWS Dashboard and follow the steps for adding a user.

Onto the Apex installation, fortunately Apex gives us an easy one liner for this <br>
``` curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh ```
<br>
Windows [Binary](https://github.com/apex/apex/releases)

## Step Two: Slapping together an API (the easy and right way)
### Intro to Apex
We could do ``` apex init ``` for this step but I think going through it yourself is better plus I need another step in this guide.

There are two important pieces to your Apex setup one being a project.json file, the other being the structure of a functions directory. The project.json file sets project wide settings as well as setting default values for all functions.
Create a functions.json file with the following values

### project.json - Setting generic parameters for project / functions. [available parameters](#parameters-for-project--function)
``` json
{
  "name": "My AWS API",
  "description": "Collection of lmabda functions to accomplish tasks of a sort",
  "memory": 128,
  "timeout": 5,
  "role": "arn:aws:iam::910144801136:role/AWSAPITools_lambda_function" // Note this is just my role, yours that you create will be different
}
```

Now onto the actual functions directory which will (obviously) hold our functions' code. The directory will be made up of folders with the name of whatever function you want it to hold. Each folder will contain be an index file, necessary dependencies, and an optional function.json file.

### Project Structure
```
 | 
 | - project.json
 | - functions/
 |   |
 |   | - ExampleFunctionWithOverrides
 |   |   |
 |   |   | - function.json (json object with updated parameters)
 |   |   | - main.py (index.js for Node.js, view Apex's documentation for other runtimes) 
 |   | - ExampleFunctionNoOverrides
 |   |   |
 |   |   | - main.py 
```

### main.py
``` python
import json

def handle(event, context):

    body = "Yoo, what's good Lambda?"
    statusCode = 200

    return {
        'statusCode': statusCode,
        'body': json.dumps(body)
    }
```

### Running
And boom! We now have a working lambda function and to see it in action running on AWS we only need 2 commands.
``` 
apex deploy
apex invoke ExampleFunction 
```
Now you should see in your console: 
```
{"statusCode": 200, "body": "\"Yoo, what's good Lambda?\""}
```

### Parameters for Project / Function

| Paramater Name | Description | Function Param |
| --- | --- | --- | 
| Name | Sets the name for the Apex project | ❌ |
| Description | Sets the description for the Apex project | ❌ |
| Memory | Value of the amount of memory you want available to the lambda | ✅ |
| Timeout | How many seconds should AWS wait for this to complete? | ✅ |
| Role | What AWS IAM role does this have access too (IAM role is how AWS manages permissions) | ✅ |
| Runtime | What language and version is this code? Ex: ['Node.js', 'Python3.7', 'Ruby'] | ✅ |

<style type="text/css">
/* Fixing this one off table */
#parameters-for-project--function + table thead tr {
    border-bottom: 2px solid #666;
}
#parameters-for-project--function + table tbody tr:not(:last-of-type) {
    border-bottom: 2px solid #666;
}
#parameters-for-project--function + table tr * {
    padding: 5px;
}
#parameters-for-project--function + table tr :nth-child(1) {
    width: 20%;
}
#parameters-for-project--function + table tr :nth-child(2) {
    width: 60%;
    padding-right: 20px 
}
#parameters-for-project--function + table tr :nth-child(3) {
    width: 20%;
}
</style>

## Step Three: Setting up your API Gateway on AWS
### API Creation
Last step until we have a functioning API! Log into your AWS account and go to the API Gateway service (Make sure you're in the same region as Apex is configured with). Hit get started and you will be greeted with an easy new API creation form fill it out with your information like so
<img ref="AWS API Create Configuration" src="/assets/img/posts/aws-api-with-apex/aws-api-create-1.png">
<br>

### Adding methods and endpoints to our APIS
This next part is pretty straight forward if you know REST APIs. We've been dumped onto another API configuration form. This form allows us to add and remove end points and methods to connect to them as well as deploying this API to production or any other stage you choose. 

First thing's first let's add an end point. In the actions drop down select create resource and fill in the resource's name with something like "hello", "apiexample", etc. 

Now select your newly created resource and in the actions drop down select create method and choose how you want to connect to it. I'm doing GET because well it makes sense and it's easy. This is the part where we choose what happens when we hit the endpoint. Right now we are going to select Lambda Function, our lambda region and the lambda function we want, like so.
<img ref="AWS API Create Endpoint" src="/assets/img/posts/aws-api-with-apex/create-endpoint-2.png">

### Deploying our API & Testing
Now we have everything we need to deploy and test. In the actions dropdown select 'Deploy API' and create a new deployment stage (I used prod) and a description if you'd like and smash that mother 'fuckin deploy button. 

After deployment, AWS redirects you to the stages section. Explore through the newly created API and click on the method you created. AWS hands you a nice little invoke URL. Now if you used GET as your method you can just click on it and see the fruits of your label. If you didn't use GET you can just use Postman or Fiddler to request it. 

### Postman Example
<img ref="AWS API Create Endpoint" src="/assets/img/posts/aws-api-with-apex/postman-example-3.png">

## Outro
It's been a ride, friends, we have a working and maintainable bare bones API project with Apex using any language(s) that you choose. See y'all in the next post or maybe on my github [@leobeosab](https://github.com/leobeosab), twitter [@ride_faster](https://twitter.com/ride_faster) or on the street [@Grand Rapids, Mi](https://www.google.com/maps/place/Grand+Rapids,+MI/@42.9563371,-85.7301284,12z/data=!3m1!4b1!4m5!3m4!1s0x88185460bb502815:0xa593aacb1bd3a8d0!8m2!3d42.9633599!4d-85.6680863)