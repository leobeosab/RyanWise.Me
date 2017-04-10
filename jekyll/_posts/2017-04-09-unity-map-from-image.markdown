---
layout: post
title:  "Map from an image in Unity"
date:   2017-02-21
excerpt: "How to parse an image and generate a map from it in Unity using a custom editor window"
tag:
- C#
- Unity
- Image Manipulation
comments: true
---

# Generating a 'map'

### Step One: Create an image to test with

I made a really simple 64x32 size image and just made a platform with some holes in black. I then went over with some yellow and made some 2x2 bricks and darkened the top two a little bit, I plan on using this for a little banner block with a top banner section and a bottom banner section. Then added some red blocks for power-ups or something of that nature.

<img alt="Custom Window" src="/assets/img/posts/unity-map-from-image/level_image.png">

### Step Two: Create a basic editor window

Add a new script in a scripts folder called LevelEditorExtension

{% highlight c# %}

using UnityEditor;

[MenuItem("Window/MapGenerator")]
static void Init()
{
    // Get existing open window or if none, make a new one
    LevelEditorExtension window = (LevelEditorExtension)EditorWindow.GetWindow(typeof(LevelEditorExtension));
    window.Show();
}

void OnInspectorUpdate()
{
    Repaint();
}

void OnGUI()
{
    GUILayout.Label("Hello, custom windows");
}

{% endhighlight %}

Now go to the top menu in Windows->MapGenerator
and there we are, we have a custom window that says "Hello, custom windows"

<img alt="Custom Window" src="/assets/img/posts/unity-map-from-image/custom_window.jpg">

### Step Four: Accessing an image

In order to read our image we first have to import it into Unity make sure that there is no compression on it and Read/Write is enabled or else we won't be able to read it.

<img alt="Import Settings" src="/assets/img/posts/unity-map-from-image/image_import_settings.png">

It should look like the image above

Now we have to get the image into our script the best way to do this is to create a Texture2D field in our window, so we can select which image we want.

{% highlight c# %}
using UnityEngine;
using UnityEditor;

public class LevelEditorExtension : EditorWindow
{

    private Texture2D level_data;

    [MenuItem("Window/MapGenerator")]
    static void Init()
    {
        // Get existing open window or if none, make a new one
        LevelEditorExtension window = (LevelEditorExtension)EditorWindow.GetWindow(typeof(LevelEditorExtension));
        window.Show();
    }

    void OnInspectorUpdate()
    {
        Repaint();
    }

    void OnGUI()
    {
        // Parameters for ObjectField: title for the field, what variable to write object to, typeof object, if scene elements can be used
        level_data = (Texture2D)EditorGUILayout.ObjectField("Load Map", level_data, typeof(Texture2D), false);
        if (level_data)
            Debug.Log("Image loaded!");
    }

}
{% endhighlight %}

<img alt="Image Field" src="/assets/img/posts/unity-map-from-image/load_image.png">

Now you open the window again and you will see a nice little image input. When there is an image in it the console will log "Image Loaded" endlessly

## Step Five: Reading the image

Now to actually read the data from the image, this is pretty simple because Unity has a great function that returns all the pixels in the image as an array of Colors just what we need. So we are going to get one of each color in the array by making a list and checking to see if the current color isn't already in there. If it isn't we add it, if it is we toss it.

{% highlight c# %}

using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Linq;


public class LevelEditorExtension : EditorWindow
{

    private Texture2D level_data;

    [MenuItem("Window/MapGenerator")]
    static void Init()
    {
        // Get existing open window or if none, make a new one
        LevelEditorExtension window = (LevelEditorExtension)EditorWindow.GetWindow(typeof(LevelEditorExtension));
        window.Show();
    }

    void OnInspectorUpdate()
    {
        Repaint();
    }

    void OnGUI()
    {
        // Parameters for ObjectField: title for the field, what variable to write object to, typeof object, if scene elements can be used
        level_data = (Texture2D)EditorGUILayout.ObjectField("Load Map", level_data, typeof(Texture2D), false);
        if (level_data)
            ReadImage();
    }

    void ReadImage()
    {
        List<Color> colors = new List<Color>();

        foreach (Color col in level_data.GetPixels())
        {
            if (!colors.Contains(col))
            {
                Debug.Log(col.ToString());
                colors.Add(col);
            }
        }
    }
}

{% endhighlight %}

Note the 'using System.Linq' at the top, this is necessary to be able to call colors.Contains(). Now when we add the image to our window we should see all the added colors be printed out to the log.

## Step Six: Creating the objects to generate

I created some basic prefabs that were a sprite with a 2D collider.

The actual art assets I used were Kenney's (Asset Jesus) over on [Kenney.nl](http://kenney.nl) I reccomend looking there for any assets you might need, he provides them for free with a CC0 license. If you use some of his work consider supporting him on [Patreon](https://www.patreon.com/kenney). That way he can keep up the fantastic work.

<img alt="Prefabs" src="/assets/img/posts/unity-map-from-image/prefab_example.png">

## Step Seven: Combining what we know

Now we can actually get into creating the full thing, we are going to read the map's colors display them as color fields with an empty object field right below each of them. We will also create a simple 'struct' in C# that will hold our color and prefab data in one object. Then once we click a button it will add all of our prefabs to the scene in the correct positions.


The global variables section:

{% highlight c# %}
//Simple struct to hold our level object
[System.Serializable]
public class LevelObject
{
    public Color color;
    public GameObject prefab;

    public LevelObject(Color color, GameObject prefab)
    {
        this.color = color;
        this.prefab = prefab;
    }
}

private string parent_name;
private Texture2D level_data;
private List<LevelObject> level_items = new List<LevelObject>();
{% endhighlight %}

As you see we create a new public class (basically a struct) called LevelObject that takes in a Color and a GameObject in the constructor. Making it easy to store our data in one array and iterate through it.

OnGUI Method:

{% highlight c# %}
//Draw the elements
void OnGUI()
{
    level_data = (Texture2D)EditorGUILayout.ObjectField("Load Map", level_data, typeof(Texture2D), false);
    parent_name = EditorGUILayout.TextField("Parent Object Name: ", "Level");
    if (level_data)
    {
        GUILayout.Label("Custom Objects");

        //Don't want to read an image 2-3 times a second, wasting CPU cycles
        if (level_items.Count < 1)
            ReadImage();

        GenerateFields();

        if (GUILayout.Button("Generate Level"))
            InsertObjects();
    }
}
{% endhighlight %}

In this function we define a parent_name input that will be used to create an empty game object to serve as the parent and delete the old one if there is one. We also make sure to only read the image if we don't have our level_items yet. After that we call the GenerateFields function which will add our Color and Object fields to the GUI. We added a button that will actually generate the level / map when it's pressed so long as there is an image currently loaded.

ReadImage Method:

{% highlight c# %}
void ReadImage()
{
    //Easier to put colors in a list and check if col is in the list than use a for loop over all the LevelObjects
    List<Color> colors = new List<Color>();

    foreach (Color col in level_data.GetPixels())
    {
        if (!colors.Contains(col) && col.a == 1) {
            colors.Add(col);
            level_items.Add( new LevelObject(col, null));
        }
    }

    //Free up some memory
    colors = null;
}
{% endhighlight %}

Very similar to our old ReadImage except this time we add a new LeveLObject to the list and set colors to null to free some memory.

GenerateFields Method:

{% highlight c# %}
void GenerateFields()
{
    for (int i = 0; i < level_items.Count; i++)
    {
        level_items[i].color = EditorGUILayout.ColorField(level_items[i].color);
        level_items[i].prefab = (GameObject)EditorGUILayout.ObjectField("Object to use", level_items[i].prefab, typeof(GameObject), false);
    }
}
{% endhighlight %}

Very simple we just loop through the LevelObjects list and set the fields.

InsertObjects Method:

{% highlight c# %}
void InsertObjects()
{
    //Make sure not to create multiple levels
    DestroyImmediate(GameObject.Find(parent_name));

    GameObject parent = new GameObject(parent_name);

    int height = level_data.height;
    int width = level_data.width;

    //Grab the size of a regular object by the renderer bounds
    float tile_size = level_items[0].prefab.GetComponent<Renderer>().bounds.size.x;

    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            foreach (LevelObject obj in level_items)
            {
                if (level_data.GetPixel(x, y).Equals(obj.color))
                {
                    GameObject tmp = Instantiate(obj.prefab, new Vector2(x * tile_size, y * tile_size), Quaternion.identity);
                    tmp.transform.parent = parent.transform;
                }
            }
        }
    }
}
{% endhighlight %}

We make sure to destroy the previous level by using the parent_name and create a new one. We make sure to grab the image width and height to iterate over the x and y positions of the image and assign an object to each of those positions with an offset of the object's size so they fit right next to each other every time.

Now when you run your code you should have an output like this:

<img alt="Custom Window" src="/assets/img/posts/unity-map-from-image/completed.png">

Thanks for reading and as always the code is available on my [Github](https://github.com/leobeosab/UnityMapFromImage).
