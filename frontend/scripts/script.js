var game = $(".game");
var display = $(".display");
var gameSection = $(".game-section");
var end = $(".btn-end");
var isMouseDown = false;

game.mousemove(mouseMovementHandler);
game.mousedown(function(event) {
  isMouseDown = true;
});

game.mouseup(mouseUpHandler);

end.click(endSession);

function mouseUpHandler(event) {
  console.log("mouse up");
  isMouseDown = false;
}

function mouseMovementHandler(event) {
  if( isMouseDown ) {
    let shift = 5;
    let x = event.pageX - shift;
    let y = event.pageY - shift;
    display.html(' (  X :: <font color="white">'+x+'</font> , Y :: <font color="white">'+y+'</font> )');
    gameSection.append('<div class="dot" style="left: '+ x +'px; top: '+ y +'px;"></div>');
  }
}

function endSession() {
   $(".dot").remove();
   display.html("");
}
