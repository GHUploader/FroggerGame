/**
 * Created by bozhanov1512 on 2/10/2016.
 */


function GameComponent(ctx, onDraw, x, y, w, h)
{
    this.ctx = ctx;
    this.onDraw = onDraw;
    this.objSender = null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

GameComponent.prototype.draw = function()
{
    this.onDraw(this.objSender, this.ctx, this.x, this.y, this.w, this.h);
};


// TODO: add setter functions here

GameComponent.prototype.setX = function(x)
{
    this.x = x;
};

GameComponent.prototype.setY = function(y)
{
    this.y = y;
};

GameComponent.prototype.setWidth = function(width)
{
    this.w = width;
};

GameComponent.prototype.setHeight = function(height)
{
    this.h = height;
};

GameComponent.prototype.setObjSender = function(objSender)
{
    this.objSender = objSender;
};

// TODO: add getters here

GameComponent.prototype.getX = function ()
{
    return this.x;
};

GameComponent.prototype.getY = function()
{
    return this.y;
};

GameComponent.prototype.getWidth = function()
{
    return this.w;
};

GameComponent.prototype.getHeight = function()
{
    return this.h;
};

GameComponent.prototype.getObjSender = function()
{
    return this.objSender;
};
