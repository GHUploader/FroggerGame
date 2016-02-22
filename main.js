/**
 * Created by bozhanov1512 on 2/10/2016.
 */

document.addEventListener("DOMContentLoaded", init, false);     // call init when the DOM has been loaded

/*
    ****************************************************************
    *   Globals
*/

var canvas;
var ctx;

var shouldRun;
var mainPlayer;

var xOffset;
var yOffset;
var acceleration = 5;

/*
    ****************************************************************
*/

function init()
{
    initLayout();

    //  Start the program.

    reset();
    start();

    //load the data first
}

function initGlobals()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    shouldRun = false;
    mainPlayer = new MainPlayer(ctx, canvas.width / 2 - 5, canvas.height - 15);
    xOffset = 0;
    yOffset = 0;
}

/*
    ****************************************************************
    * **************************************************************
    * Main API
 */

function start()
{
    shouldRun = true;
    requestAnimationFrame(update);
}

function stop()
{
    shouldRun = false;
}

function reset()
{
    //TODO: reset the entire program to its initial state

    initGlobals();
}

/*
    ****************************************************************
    * **************************************************************
*/

function update()
{
    //TODO: add all of the update code here

    updateLocations();
    draw();

    if(shouldRun)
    {
        requestAnimationFrame(update);
    }
}

function updateLocations()
{
    mainPlayer.gObj.x += xOffset;
    mainPlayer.gObj.y += yOffset;
}

function draw()
{
    //TODO: add all of the code respocible for drawing components on the screen here

    mainPlayer.draw();
}



/*
    *   Functions responcible for the movement of the player go here
    *
 */



function onKeyDown(event)
{

}

function onWDown()
{
    yOffset = acceleration;
}

function onWUp()
{
    yOffset = 0;
}

function  onSDown()
{
    yOffset = -acceleration;
}

function  onSUp()
{
    yOffset = 0;
}



