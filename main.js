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
var collision;
var textLabel;
var finishLine;
var points;
var level;

var xOffset;
var yOffset;
var acceleration = 5;
var frameHandle = null;

/*
    ****************************************************************
*/

var carImgLoaded = false;
var frogImgLoaded = false;

function init()
{
    initLayout();

    //load the data first

    carImage = new Image();
	/*carImage.onload = function() // there was an error reading the width and height of the images before this was done
	{
		if(frogImgLoaded)           // if both are loaded at the same time, then the game does not start, fix by adding interval
		{
			initContinue();
		}
		carImgLoaded = true;
	};//*/
	carImage.src = "resources/car.png";

    frogImage = new Image();
	/*frogImage.onload = function()
	{
		if(carImgLoaded)
		{
			initContinue();
		}
		carImgLoaded = true;
	};//*/
    frogImage.src = "resources/frog.png";

    //  Start the program.
	setTimeout(initContinue, 1250);

}

function initContinue()
{
	reset();
	start();
}

function initGGlobals()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    shouldRun = false;
    mainPlayer = new MainPlayer(ctx, canvas.width / 2 - 5, canvas.height - 15);
	world = new World(canvas, ctx);
	collision = new Collision(mainPlayer.gObj.getRect());
	textLabel = new Text(ctx, new Point(10, canvas.height - 100));
	textLabel.setText("Points: " + points + "\nLevel: " + level);
	finishLine = new FinishLine(canvas, ctx);
    xOffset = 0;
    yOffset = 0;
}

function initGlobals()
{
	points = 0;
	level = 0;
	initGGlobals();
}

/*
    ****************************************************************
    * **************************************************************
    * Main API
 */

function start()
{
	setTimeout(function(){
		shouldRun = true;
		mountEventListeners();
		frameHandle = requestAnimationFrame(update);
	}, 10);
}

function stop()
{
    shouldRun = false;
    dismountEventListeners();
	if(frameHandle)
	{
		cancelAnimationFrame(frameHandle);
		frameHandle = null;
	}
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
	checkCollision();

    if(shouldRun)
    {
        requestAnimationFrame(update);
    }
}

function updateLocations()
{
	var mainPlayerPos = mainPlayer.getPosition();
    mainPlayer.setX(mainPlayerPos.x + xOffset);
    mainPlayer.setY(mainPlayerPos.y + yOffset);
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //TODO: add all of the code responsible for drawing components on the screen here

	finishLine.draw();
    mainPlayer.draw();
	world.gObj.draw();
	textLabel.draw();

}

function checkCollision()
{
	collision.cParams = world.getCollisionParams();
	collision.cParams.push(finishLine.getCollisionParams());
	collision.point = mainPlayer.getPosition();
	if(collision.paramsContainPoint())
	{
		stop();
		if(collision.typeHit == "obstacle")
		{
			carHit();
		}
		if(collision.typeHit == "finish")
		{
			finishLineReached();
		}
		initGGlobals();                 // reinitialization of game components will set the new points count and level
		start();
	}
}

function carHit()
{
	points -= 10;
}

function finishLineReached()
{
	points += 50;
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
