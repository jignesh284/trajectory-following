var game = $(".canvas-wrapper");
var display = $(".display");
var gameSection = $(".game-section");
var end = $(".btn-end");
var isMouseDown = false;

/*********************** CANVAS ***************************** */
var canvasHeight = game.height();
var canvasWidth = game.width();
game.append('<canvas id="game-canvas" width="'+canvasWidth+'" height="'+canvasHeight+'"></canvas>');
var canvas = document.getElementById("game-canvas");
console.log(canvas);
var ctx = canvas.getContext("2d");
var canvasOffset = getOffset(canvas);
var offsetX = canvasOffset.x;
var offsetY = canvasOffset.y;
var startX;
var startY;
var isDown = false;

function drawLine(x, y) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

canvas.onmousedown = function (e)  {
    ctx.save();
    e.preventDefault();
    e.stopPropagation();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    console.log(startX, startY);
    isDown = true;
}

//When the mouse moves out of the game-zone:
canvas.onmouseout = function (e)  {
  e.preventDefault();
  e.stopPropagation();
  isDown = false;
}

canvas.onmousemove = function (e)  {
    if (!isDown) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    display.html(' (  X :: <font color="white">'+mouseX+'</font> , Y :: <font color="white">'+ parseInt( canvasHeight - mouseY) +'</font> )');
    drawLine(mouseX, mouseY);
    startX = mouseX;
    startY = mouseY;
}

canvas.onmouseup = function (e)  {
    if (!isDown) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    isDown = false;
}

function getOffset(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    console.log(xPosition + " :: "+ yPosition);
    return { x: xPosition, y: yPosition };
}

end.on('click', endSession);

function endSession() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
