/**
 * Created by bozhanov1512 on 2/10/2016.
 */

/*
 ****************************************************
 * Globals
 *
 */

var carImage;

/*
 ****************************************************
 */


/**
 *
 * All Obstacle objects must contain a variable referencing to valid instance of Obstacle. The name of the variable must
 * be oObg, which must also contain a valid instance of GameComponent, with that standard variable name of gObg. This
 * must be held as a strict convention in order to prevent confusion.
 *
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */

function Obstacle(ctx, x, y, width, height)
{
	this.gObj = new GameComponent(ctx, this.onDraw, x, y, width, height);
}

/**
 *
 * A dummy function. Different Obstacle objects must set onDraw equal to a valid function that will draw the
 * actual shape on the canvas.
 *
 * @param objSender
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 */

Obstacle.prototype.onDraw = function(objSender, ctx, x, y, width, height){};

Obstacle.prototype.onCollision = function()
{

};

function Car(ctx)
{
	this.image = carImage;
	this.oObj = new Obstacle(ctx, 0, 0, this.getWidth(), this.getHeight());
	this.oObj.gObj.onDraw = this.iDraw;
	this.oObj.gObj.setObjSender(this);
	this.speed = 0;
	this.direction = 1;				// 1 is forward, -1 is backwards
	this.xOffset = 0;
}

Car.prototype.iDraw = function(objSender, ctx, x, y, w, h)
{
	objSender.oObj.gObj.x += objSender.xOffset;
	ctx.drawImage(objSender.image, x, y);					// automatically update the position based on the speed each time the car is redrawn
};

Car.prototype.getWidth = function()
{
	return this.image.width;
};

Car.prototype.getHeight = function()
{
	return this.image.height;
};

Car.prototype.setDirectionForward = function(isForward)
{
	if(isForward)
	{
		this.direction = 1;
	}
	else
	{
		this.direction = -1;
	}
};

Car.prototype.setSpeed = function(speed)
{
	this.speed = speed;
	this.xOffset = this.direction * this.speed;
};

