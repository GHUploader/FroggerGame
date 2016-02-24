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
var world;

var xOffset;
var yOffset;
var acceleration = 5;

/*
    ****************************************************************
*/

function init()
{
    initLayout();

    //load the data first

    carImage = new Image();
    carImage.src = "resources/car.png";

    frogImage = new Image();
    frogImage.src = "resources/frog.png";

    //  Start the program.

    reset();
    start();


}

function initGlobals()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    shouldRun = false;
    mainPlayer = new MainPlayer(ctx, canvas.width / 2 - 5, canvas.height - 15);
	world = new World(canvas, ctx);
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
    mountEventListeners();
}

function stop()
{
    shouldRun = false;
    dismountEventListeners();
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

function mountEventListeners()
{
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
}

function dismountEventListeners()
{
    document.removeEventListener("keydown", onKeyDown, false);
    document.removeEventListener("keyup", onKeyUp, false);
}

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //TODO: add all of the code responsible for drawing components on the screen here

    mainPlayer.draw();
	world.gObj.draw();
}



/*
    *   Functions responcible for the movement of the player go here
    *
 */



function onKeyDown(event)
{
    switch (event.keyCode)
    {
        case 87:               // up
            onWDown();
            break;

        case 83:               // down
            onSDown();
            break;

        case 65:                // left
            onADown();
            break;

        case 68:               // right
            onDDown();
            break;

        default:

            // nothing to put here
    }
}

function onKeyUp(event)
{
    switch (event.keyCode)
    {
        case 87:               // up
            onWUp();
            break;

        case 83:               // down
            onSUp();
            break;

        case 65:                // left
            onAUp();
            break;

        case 68:               // right
            onAUp();
            break;

        default:

        // nothing to put here
    }
}

function onWDown()
{
    yOffset = -acceleration;
}

function onWUp()
{
    yOffset = 0;
}

function  onSDown()
{
    yOffset = acceleration;
}

function  onSUp()
{
    yOffset = 0;
}

function onADown()
{
    xOffset = -acceleration;
}

function onAUp()
{
    xOffset = 0;
}

function onDDown()
{
    xOffset = acceleration;
}

function onDUp()
{
    xOffset = 0;
}
