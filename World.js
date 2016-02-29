/**
 * Created by bozhanov1512 on 2/10/2016.
 */



function World(canvas, ctx)
{
	this.gObj = new GameComponent(ctx, this.onDraw, 0, 0, canvas.width, canvas.height);
	this.gObj.setObjSender(this);
	this.road = new Road(canvas, ctx, 5, 100);
	this.collisionParams = [];
}

World.prototype.onDraw = function(objSender, ctx, x, y, w, h)
{
	objSender.clearCollisionParams();
	objSender.road.gObj.draw();
	var ncParams = objSender.road.getCollisionParams();
	objSender.collisionParams = objSender.collisionParams.concat(ncParams);
};

World.prototype.getCollisionParams = function()
{
	return this.collisionParams;
};

World.prototype.clearCollisionParams = function()
{
	this.collisionParams = [];
};

function FinishLine(canvas, ctx)
{
	this.gObj = new GameComponent(ctx, function(){}, new Point(0, 0), canvas.width, 60);
	this.laneCount = 3;
}

FinishLine.prototype.getCollisionParams = function()
{
	var cParams = this.gObj.getCollisionParams();
	cParams.type = "finish";
	return cParams;
};

FinishLine.prototype.draw = function()
{
	var sqrSide = this.gObj.getHeight() / this.laneCount;
	var i = 0;
	for(; i < this.laneCount; ++i)
	{
		var x = 0;
		var colorFlag = (i + 1) % 2;
		while(x < this.gObj.getWidth())
		{
			if(colorFlag)
			{
				this.gObj.ctx.fillStyle = "#00FF00";
				colorFlag = false;
			}
			else
			{
				this.gObj.ctx.fillStyle = "#ffcc00";
				colorFlag = true;
			}
			this.gObj.ctx.fillRect(x, i * sqrSide, sqrSide, sqrSide);
			x += sqrSide;
		}
	}

};

function Road(canvas, ctx, laneCount, y)
{
	this.gObj = new GameComponent(ctx, this.onDraw, new Point(0, y), canvas.width, (new Car(ctx)).getHeight() * laneCount);
	this.gObj.setObjSender(this);
	this.collisionParams = [];
	this.lanes = [];
	this.initLanes(canvas, ctx, laneCount);
}

Road.prototype.initLanes = function(canvas, ctx, lCount)
{
	var il;
	for(il = 0; il < lCount; ++il)
	{
		this.lanes[il] = new Lane(canvas, ctx, (il + 1) * this.gObj.getY());
		this.lanes[il].setSpeed(getRandom(5, 10));
		//this.lanes[il].setDirectionForward(false);
		this.lanes[il].setDistBetweenCars(getRandom(120, 1000));
		this.lanes[il].setCarCount(5);
	}
};

Road.prototype.onDraw = function(objSender, ctx, x, y, w, h)
{
	objSender.clearCollisionParams();
	var id;
	for(id = 0; id < objSender.lanes.length; ++id)
	{
		objSender.lanes[id].gObj.draw();
		var ncParams = objSender.lanes[id].getCollisionParams();
		objSender.collisionParams = objSender.collisionParams.concat(ncParams);
	}
};

Road.prototype.getCollisionParams = function()
{
	return this.collisionParams;
};

Road.prototype.clearCollisionParams = function()
{
	this.collisionParams = [];
};

function Lane(canvas, ctx, y)
{
	this.gObj = new GameComponent(ctx, this.onDraw, new Point(0, y), canvas.width, carImage.height);
	this.gObj.setObjSender(this);
	this.cars = [];
	this.speed = 0;
	this.carsInitCnt = 1;
	this.isForward = true;
	this.isJustInit = true;
	this.distBetweenCars = 0;
	this.distCounter = 0;
	this.collisionParams = [];
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

Lane.prototype.setDirectionForward = function(isForward)
{
	this.isForward = isForward;
};

Lane.prototype.setDistBetweenCars = function(dist)
{
	this.distBetweenCars = dist;
};

Lane.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};

Lane.prototype.setCarCount = function(carCount)
{
	this.initCheck();
	var i;
	for(i = 0; i < carCount; ++i)
	{
		this.cars[i] = new Car(this.gObj.ctx);
		this.cars[i].setSpeed(this.speed);
		this.cars[i].setDirectionForward(this.isForward);
	}
};

Lane.prototype.getCollisionParams = function()
{
	return this.collisionParams;
};

Lane.prototype.clearCollisionParams = function()
{
	this.collisionParams = [];
};

Lane.prototype.onDraw = function(objSender, ctx, x, y, width, height)
{
	var carsReadyCount = objSender.carsInitCnt;                              // launch the cars one after the other
	objSender.clearCollisionParams();
	var i;
	for(i = 0; i < carsReadyCount; ++i)
	{
		objSender.cars[i].setY(y);
		objSender.cars[i].draw();
		objSender.collisionParams[i] = objSender.cars[i].getCollisionParams();
		if(carsReadyCount == objSender.cars.length && objSender.cars[i].getX() >= width && objSender.cars[0].getX() > objSender.distCounter)
		{
			objSender.cars[i].setX(objSender.gObj.getX() - objSender.cars[i].getWidth());
		}
	}

	if(objSender.carsInitCnt < objSender.cars.length)
	{
		if(objSender.distCounter >= objSender.distBetweenCars)
		{
			++objSender.carsInitCnt;
			objSender.distCounter = 0;
		}
		objSender.distCounter += objSender.speed;
	}

};



