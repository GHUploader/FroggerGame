/**
 * Created by bozhanov1512 on 2/10/2016.
 */



function MainPlayer(ctx, x, y)
{
    this.gObj = new GameComponent(ctx, this.onDraw, x, y, 0, 0);
    this.gObj.setObjSender(this);
}

MainPlayer.prototype.draw = function()
{
    this.gObj.draw();
};

MainPlayer.prototype.onDraw = function(objSender, ctx, x, y, width, height)
{
    objSender.iDrawFrog(ctx, x, y);

};

/*
   *
   * Purpose:    Draws the frog on the screen. The Dimensions are hardcoded so that the width and
   *            are not adjustable. The width and height parameters passed in from onDraw are discarded.
   *
 */

MainPlayer.prototype.iDrawFrog = function(ctx, x, y)
{
    var width = 10;
    var height = 10;
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    fillCircle(ctx, Math.min(width, height), x + width / 2, y + height / 2);

};

// setters

MainPlayer.prototype.setX = function(x)
{
    this.gObj.setX(x);
};


MainPlayer.prototype.setY = function(y)
{
    this.gObj.setY(y);
};

// getters

MainPlayer.prototype.getX = function()
{
    return this.gObj.getX();
};

MainPlayer.prototype.getY = function()
{
    return this.gObj.getY();
};
