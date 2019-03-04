var game = $(".canvas-wrapper");
var display = $(".display");
var gameSection = $(".game-section");
var end = $(".btn-end");
var submit = $(".btn-submit");
var obsForm = $('#obstacle-form')
var isMouseDown = false;


obsForm.submit(function(e) {
  // Get all the forms elements and their values in one step
  e.preventDefault();
  var $inputs = $('#obstacle-form :input');
  var values = {};
  $inputs.each(function() {
    if( $(this).attr('type') != "submit" ) {
      values[this.name] = $(this).val();
    }
  });
  numObstacles = parseInt( values["numObstacles"] );
  maxObstacleRadius = parseInt( values["maxObstacleRadius"] );
  minObstacleRadius = parseInt( values["minObstacleRadius"] );
  clearGame();
  randomObstacleGenerator( numObstacles );
});


/*********************** CANVAS ***************************** */
var canvasHeight = game.height();
var canvasWidth = game.width();
var maxObstacleRadius = 20;
var minObstacleRadius = 5;
var numObstacles = 10;
var obstaclesArray = [];
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
    ctx.lineWidth = 1;
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
    display.html(' (  X :: <font color="white">'+mouseX+'</font> , Y :: <font color="white">'+ reverseYaxis( mouseY ) +'</font> )');
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
  clearGame();
}

function clearGame() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.closePath();
}

function reverseYaxis( ycord ) {
   return parseInt( canvasHeight - ycord );
}


function createCircle(centerX, centerY, radius) {
   ctx.beginPath();
   ctx.arc(centerX, centerY, radius, 0, 2*Math.PI);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}

function randomObstacleGenerator(num) {
  debugger;
    while(num) {
      x = parseInt( Math.random() * canvasWidth );
      y = parseInt( Math.random() * canvasHeight );
      r = parseInt( Math.random() * (maxObstacleRadius - minObstacleRadius) + minObstacleRadius );
      if( isValidObstacle(x,y,r) ) {
        createCircle(x,y,r);
        obstaclesArray.push({x,y,r});
        num--;
      } 
    }
}

function isValidObstacle() {
  if( (x-r) > 0 && (y-r) > 0 && (x+r) < canvasWidth && (y+r) < canvasHeight ) {
      return true;
  } else {
     return false;
  }
}

