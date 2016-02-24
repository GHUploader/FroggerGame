/**
 * Created by bozhanov1512 on 2/10/2016.
 */



function World(canvas, ctx)
{
	this.gObj = new GameComponent(ctx, this.onDraw, 0, 0, canvas.width, canvas.height);
	this.gObj.setObjSender(this);
	this.road = new Road(canvas, ctx, 5, 100);
}

World.prototype.onDraw = function(objSender, ctx, x, y, w, h)
{
	objSender.road.gObj.draw();
};


function Road(canvas, ctx, laneCount, y)
{
	this.gObj = new GameComponent(ctx, this.onDraw, 0, y, canvas.width, (new Car(ctx)).getHeight() * laneCount);
	this.gObj.setObjSender(this);
	this.lanes = [];
	this.initLanes(canvas, ctx, laneCount);
}

Road.prototype.initLanes = function(canvas, ctx, lCount)
{
	for(il = 0; il < lCount; ++il)
	{
		this.lanes[il] = new Lane(canvas, ctx, Math.max(il, 1) * this.gObj.getY());
		this.lanes[il].setSpeed(getRandom(2, 10));
		//this.lanes[i].setDirectionForward(getRandom(0, 1));
		this.lanes[il].setBetweenCars(30);
		this.lanes[il].setCarCount(5);
	}
};

Road.prototype.onDraw = function(objSender, ctx, x, y, w, h)
{
	for(i = 0; i < objSender.lanes.length; ++i)
	{
		objSender.lanes[i].gObj.draw();
	}
};

function Lane(canvas, ctx, y)
{
	this.gObj = new GameComponent(ctx, this.onDraw, 0, y, canvas.width, carImage.height);
	this.gObj.setObjSender(this);
	this.cars = [];
	this.speed = 0;
	this.carsInitCnt = 1;
	this.isForward = true;
	this.isJustInit = true;
	this.distBetweenCars = 0;
	this.distCounter = 0;
}

Lane.prototype.initCheck = function()
{
	if(!this.isJustInit)
	{
		if(!this.speed)
		{
			throw new Error("speed = 0");
		}
	}
	else
	{
		this.isJustInit = false;
	}
};

Lane.prototype.setBetweenCars = function(dist)
{
	this.distBetweenCars = dist;
};

Lane.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};

Lane.prototype.setCarCount = function(carCount)
{
	for(i = 0; i < carCount; ++i)
	{
		this.cars[i] = new Car(this.gObj.ctx);
		this.cars[i].setSpeed(this.speed);
		this.cars[i].setDirectionForward(this.isForward);
	}
};

Lane.prototype.onDraw = function(objSender, ctx, x, y, width, height)
{
	var carsReadyCount = objSender.carsInitCnt;                              // launch the cars one after the other
	for(i = 0; i < carsReadyCount; ++i)
	{
		objSender.cars[i].oObj.gObj.setY(y);
		objSender.cars[i].oObj.gObj.draw();
	}

	if(objSender.carsInitCnt < objSender.cars.length && objSender.distCounter == objSender.distBetweenCars)
	{
		++objSender.carsInitCnt;
		objSender.distCounter = 0;
	}

	++objSender.distCounter;

};



