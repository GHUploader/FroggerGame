/**
 * Created by bozhanov1512 on 2/16/2016.
 */
/**
 * Created by David on 1/7/2016.
 */

function drawCircle(context, diameter, x, y)
{
    context.beginPath();
    dCircle(context, diameter, x, y);
    context.closePath();
}

function dCircle(context, diameter, x, y)
{
    context.arc(x, y, diameter / 2, 0, Math.PI * 2);
    context.stroke();
}

function fillCircle(context, diameter, x, y)
{
    context.beginPath();
    dCircle(context, diameter, x, y);
    context.fill();
    context.closePath();
}

function drawEllipse(context, width, height, x, y)
{

    context.beginPath();
    dEllipse(context, width, height, x, y);
    context.closePath();
}

function fillEllipse(context, width, height, x, y)
{
    context.beginPath();
    dEllipse(context, width, height, x, y);
    context.fill();
    context.closePath();
}

function dEllipse(context, width, height, x, y)
{
    var cpXR = x + width / 2;
    var cpXL = x - width / 2;
    var cpYUp = y - height / 2;
    var cpYDW = y + height / 2;
    context.moveTo(x, cpYUp);
    context.bezierCurveTo(cpXR, cpYUp, cpXR, cpYDW, x, cpYDW);
    //context.moveTo(x, y + cpYUp);
    context.bezierCurveTo(cpXL, cpYDW, cpXL, cpYUp, x, cpYUp);
    context.stroke();
}

function drawText(context, fontsize, text, x, y)
{
    var lastNLIndex = 0;
    var nlIndex = text.indexOf('\n');
    var nextStr = text.substring(lastNLIndex, nlIndex);
    var oStr = text.substring(nlIndex + 1, text.length);
    var nY = y;
    while(1 < oStr.length)
    {
        context.fillText(nextStr, x, nY);
        nlIndex = getPositive(oStr.indexOf('\n'), oStr.length);
        nextStr = oStr.substr(0, nlIndex);
        oStr = oStr.substr(Math.min(nlIndex + 1, oStr.length - 1), oStr.length);
        nY += fontsize;
    }
    context.fillText(nextStr, x, nY);
}

function getPositive(val1, val2)                // returns the positive value; if both positive, returns first value; if both negative, returns undefined
{
    if(val1 > 0)
    {
        return val1;
    }
    if(val2 > 0)
    {
        return val2;
    }
    return undefined;
}

function scaleColor(rgbHex, scale)
{
    var red = rgbHex.substr(1, 2);
    var green = rgbHex.substr(3, 2);
    var blue = rgbHex.substr(5, 2);
    var iRed = parseInt(red, 16) * scale;
    var iGreen = parseInt(green, 16) * scale;
    var iBlue = parseInt(blue, 16) * scale;
    return "#" + iRed.toString(16) + iGreen.toString(16) + iBlue.toString(16);
}

function calcGradientColorStep(color1, color2, pixelRange)
{
    var cRange = Math.max(color1, color2) - Math.min(color1, color2);
    var step = Math.max(Math.floor(cRange / (pixelRange + 1)), 1);
    return step;
}

function gradient(context, color1, color2, pixelRange, drawPath)            // draws a gradient with any shape
{
    var step = calcGradientColorStep(color1, color2, pixelRange);
    var cIndex = color1 + step;
    while(cIndex < color2)
    {
        drawPath(context, cIndex);
        cIndex += step;
    }
}

function rectangleContainsPoint(x1, x2, y1, y2, x, y)
{
    if((x1 < x && x < x2) && (y1 < y && y < y2))
    {
        return true;
    }
    return false;
}

function reduce(numerator, denominator)                                     // reduces a fraction as much as possible
{
    var vMin = Math.min(numerator, denominator);
    var gcd = vMin;
    var iGcd = 2;
    while(iGcd < vMin)
    {
        var remN = numerator % iGcd;
        var remD = denominator % iGcd;
        if((remN | remD) == 0)
        {
            gcd = iGcd;
        }
        ++iGcd;
    }
    if((numerator % gcd | denominator % gcd) != 0)
    {
        return [numerator, denominator];
    }
    return [numerator / gcd, denominator / gcd];
}

function getInverse(num)
{
    return 1 / num;
}

function scaleTo(numerator, denominator, scale)
{
    return [numerator * scale, denominator * scale];
}

function proportion(termOne, termTwo, termThree)                            // returns 4th term of proportion
{
    var lSide = termTwo * termThree;
    return lSide / termOne;
}

function degreesToRadians(deg)
{
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad)
{
    return rad * (180 / Math.PI);
}

function getSlope(deg)                                                      // ret: rise / 1, scale this later to match rise with speed
{
    if(deg == 90 || deg == -90)
    {
        return Infinity;
    }
    var rad = degreesToRadians(deg);
    return Math.tan(rad);
}

function getOffsets(slope, speed)
{
    if(slope > 1)
    {
        return scaleTo(slope, 1, getInverse(slope) * speed);
    }
    scaleTo(slope, 1, speed);
}
