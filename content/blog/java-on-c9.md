+++
author = "Ryan Wise"
categories = ["Tools"]
date = "2018-02-21"
description = "How to get up and running with Java Development on the Cloud Nine IDE"
featured = ""
featuredalt = ""
featuredpath = ""
linktitle = ""
title = "Java Development on Cloud Nine"
type = "post"

+++

# Java Development on Cloud Nine IDE

**Update**: Amazon Web Service's has bought out Cloud nine and is now hosted on their platform so this information may not be accurate

Cloud Nine is an online IDE that provides you with your very own Ubuntu box to create a project in. It has templates for C++, NodeJS, PHP & Wordpress, Ruby and more. There isn't any template for Java Development. So I will go through how to setup a blank workspace for Java development. This is escpecially handy if you're a student and only have a Chromebook to develop on.

### Step One: Creating a Workspace

Go to [CloudNine](https://c9.io) and create an account / login. I reccomend logging in with Github as it provides easy integration with your projects. Create a new Workspace enter a name and optional description and choose blank for the template option.

<img alt="Base Setup" src="/assets/img/posts/java-on-c9/c9-project-setup.png">

Give that a little bit to process and you should come up with a screen that looks like this:

<img alt="Initial Workspace" src="/assets/img/posts/java-on-c9/c9-base-page.png">

### Step Two: Installing the JDK

In the terminal section near the bottom of the screen type the following commands:

``` bash
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update

sudo apt-get install oracle-java8-installer
#hit yes and accept the license agreement
```

If you are not familiar with Ubuntu I will explain what is going on here. First we add a new repository to our package manager, essentially just allowing it to grab new binaries to install from the url we specified. Next we update our package manager so it is aware of all the new binaries we can download. Last we install the JDK.

### Step Three: Test the Installation

I just created a basic Hello World in Java.

Create a new file by right clicking in the workspace panel and hit new file. Create a file name like HelloWorld.java

Here is the code I used:

``` java
public class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello, World!");
    }
}
```

Note that the class should be what you named your file. Minus the .java.

Now to compile and test your code you enter the following commands.

``` bash
javac HelloWorld.java
java HelloWorld
```

Javac compiles your code and java (your main class) runs it.

If all went  well you should see "Hello, World!" in the terminal window.

<img alt="Final Result" src="/assets/img/posts/java-on-c9/final-result.png">
