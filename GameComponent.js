/**
 * Created by bozhanov1512 on 2/10/2016.
 */


function Text(ctx, point)
{
	this.ctx = ctx;
	this.str = "";
	this.dStr = "";
	this.point = point;
	this.cpl = 0;
	this.fontSize = 20;
	this.font = "sans-serif";
	this.fStyle = "#aaaaaa";
}

Text.prototype.setCharsPerLine = function(charsPerLine)
{
	this.cpl = charsPerLine;
};

Text.prototype.setText = function(str)
{
	this.str = str;
	if(this.cpl)
	{
		this.dStr = formatStr(str, this.cpl);
	}
	else
	{
		this.dStr = str;
	}
};

Text.prototype.draw = function()
{
	this.ctx.fillStyle = this.fStyle;               // this.ctx.fillStyle = this.fillStyle;  gives an error
	this.ctx.font = this.fontSize + "px " + this.font;
	drawText(this.ctx, this.fontSize, this.dStr, this.point.x, this.point.y);
};

function GameComponent(ctx, onDraw, point, w, h)
{
    this.ctx = ctx;
    this.onDraw = onDraw;
    this.objSender = null;
    this.rect = new Rect();

	this.rect.setPosition(point);
	this.rect.setWidth(w);
	this.rect.setHeight(h);
}

GameComponent.prototype.draw = function()
{
    this.onDraw(this.objSender, this.ctx, this.getX(), this.getY(), this.getWidth(), this.getHeight());
};


// TODO: add setter functions here

GameComponent.prototype.setX = function(x)
{
	var curPosition = this.rect.getPosition();
    var nPosition = new Point(x, curPosition.y);
	this.rect.setPosition(nPosition);
};

GameComponent.prototype.setY = function(y)
{
	var curPosition = this.rect.getPosition();
	var nPosition = new Point(curPosition.x, y);
	this.rect.setPosition(nPosition);
};

GameComponent.prototype.setWidth = function(width)
{
    this.rect.setWidth(width);
};

GameComponent.prototype.setHeight = function(height)
{
    this.rect.setHeight(height);
};

GameComponent.prototype.setObjSender = function(objSender)
{
    this.objSender = objSender;
};

// TODO: add getters here

GameComponent.prototype.getX = function ()
{
    return this.rect.getPosition().x;
};

GameComponent.prototype.getY = function()
{
    return this.rect.getPosition().y;
};

GameComponent.prototype.getPosition = function()
{
	return this.rect.getPosition();
};

GameComponent.prototype.getRect = function()
{
	return this.rect;
};

GameComponent.prototype.getWidth = function()
{
    return this.rect.getWidth();
};

GameComponent.prototype.getHeight = function()
{
    return this.rect.getHeight();
};

GameComponent.prototype.getObjSender = function()
{
    return this.objSender;
};

GameComponent.prototype.getCollisionParams = function()
{
	var cParams = new CollisionParams();
	cParams.computeParams(this.getPosition(), this.getWidth(), this.getHeight());
	return cParams;
};


function Point(x, y)
{
    this.x = x;
    this.y = y;
}

function Rect()
{
	this.tlPoint = new Point(0, 0);
	this.trPoint = new Point(0, 0);
	this.blPoint = new Point(0, 0);
	this.brPoint = new Point(0, 0);
}

Rect.prototype.iAdjustPoints = function(point, w, h)
{
	this.tlPoint = point;
	this.trPoint = new Point(this.tlPoint.x + w, this.tlPoint.y);
	this.blPoint = new Point(this.tlPoint.x, this.tlPoint.y + h);
	this.brPoint = new Point(this.trPoint.x, this.blPoint.y);
};

Rect.prototype.setPosition = function(point)
{
	var w = this.getWidth();
	var h = this.getHeight();
	this.iAdjustPoints(point, w, h);
};

Rect.prototype.setWidth = function(width)
{
	var h = this.getHeight();
	this.iAdjustPoints(this.tlPoint, width, h);
};

Rect.prototype.setHeight = function(height)
{
	var w = this.getWidth();
	this.iAdjustPoints(this.tlPoint, w, height);
};

Rect.prototype.getPosition = function()
{
	return this.tlPoint;
};

Rect.prototype.getWidth = function()
{
	return this.trPoint.x - this.tlPoint.x;
};

Rect.prototype.getHeight = function()
{
	return this.blPoint.y - this.tlPoint.y;
};



