var angle = 0
var speed = 0.5
var x = 0
function setup() {
  createCanvas(windowWidth,windowHeight);
  fill(0)
  textSize(180)
  stroke(0)
  textFont("Helvetica")
  mouseX=150
  mouseY=150
  noCursor()
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);

}

function draw() {
  background(255)
  x = abs(windowWidth*0.5-mouseX)
  y = abs(windowHeight*0.5-mouseY)
  l1 = map(x, 0, 0.5*windowWidth, 0, 0.35*windowHeight);
  l2 = map(y, 0, 0.5*windowHeight, 0, 0.35*windowHeight);
  push()
  translate(windowWidth*0.5,windowHeight*0.5);
  Rotate(3,l1,l2,0.5,".")
  pop()
  push()
  textSize(20)
  fill(60)
  strokeWeight(0)
  text("LI Sikai 2017   skyl@me.com",0.92*windowWidth-60,0.9*windowHeight,100,200)
  pop()


}



function Rotate(sides,l1,l2,time,string) {

  for (var i = 1; i<= sides; i++){
    push()
    rotate(angle)
    rotate(i*2*PI/sides)
    text(string,l1,0)
      for (var m = 1; m<= sides; m++){
        push()
        fill(60+random(-60,60))
        translate(l1,0);
        rotate(angle)
        rotate(m*2*PI/sides)
        text(string,l1,0)
          for (var n = 1; n<= sides; n++){
            push()
            scale(random(1,1,5))
            fill(100+random(-60,60))
            translate(l2,0);
            rotate(angle)
            rotate(n*2*PI/sides)
            text(string,l1,0)
            pop()
          }
        pop()
      }
    pop()
    }
    angle = 0.5*PI *sin(millis()/(1000/2*PI)*(1/time))
}

document.ontouchmove = function (e) {
  e.preventDefault();
}




