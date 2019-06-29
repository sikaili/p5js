var angle = 0
var a = 0
var b = 0
var rand = 0
var sett = 0
var ampli = 0
var angle = 0
function setup() {
  createCanvas(windowWidth,windowHeight)
  noCursor()
  mouseX = 0.5*windowWidth
  mouseY = 0.5*windowHeight


}

function draw() {
  var targetX = mouseX
  var targetY = mouseY
  background (0,0,0)
  stroke(255,255,255)
  strokeWeight(1)
  sett = map (a, 0,windowWidth,-100,100)
  rand = random(0,1)*(sett)
  ampli = map (b,0,windowHeight,1/4*windowHeight,5/4*windowHeight)
  push()
  textSize(20)
  fill(150)
  strokeWeight(0)
  text("LI Sikai 2017   skyl@me.com",0.92*windowWidth-60,0.9*windowHeight,100,200)
  pop()

  for (var x=0;x<windowWidth;x+=0.5){
    y = sin(5.5*x+random(-0.01,0.01)+random(-0.001,0.001)*sett)*ampli+ rand*1.5;
    line (x,0,x+0.3*a,y);
    
  }
  a += (targetX - a)*0.07
  b += (targetY - b)*0.07
  translate(a,b)
  rotate(rand*0.05)
  strokeCap(SQUARE);
  stroke(0,0,0)
  strokeWeight(25)
  line (-100,0,100,0)
}
function windowResized() {
  resizeCanvas (windowWidth, windowHeight)
}

document.ontouchmove = function (e) {
  e.preventDefault();
}




