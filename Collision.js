/**
 * Created by bozhanov1512 on 2/26/2016.
 */


function CollisionParams()
{
    this.xLeft = 0;
    this.xRight = 0;
    this.yUp = 0;
    this.yDown = 0;
	this.type = "";
}

function CollisionParams(xLeft, xRight, yUp, yDown)
{
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.yUp = yUp;
    this.yDown = yDown;
	this.type = "";
}

CollisionParams.prototype.computeParams = function(point, width, height)
{
	this.xLeft = point.x;
	this.xRight = point.x + width;
	this.yUp = point.y;
	this.yDown = point.y + height;
};

CollisionParams.prototype.containPoint = function(point)
{
	return rectangleContainsPoint(this.xLeft, this.xRight, this.yUp, this.yDown, point.x, point.y);
};

function Collision(rect)
{
	this.rect = rect;
	this.cParams = [];
	this.collision = false;
	this.typeHit = "";
}

Collision.prototype.paramsContainPoint = function()
{
	var index = 0;
	while(index < this.cParams.length && !this.collision)
	{
		var curParams = this.cParams[index];
		this.collision = curParams.containPoint(this.rect.tlPoint) | curParams.containPoint(this.rect.brPoint);
		this.typeHit = curParams.type;
		++index;
	}
	return this.collision;
};

