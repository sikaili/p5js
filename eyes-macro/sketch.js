var angle = 0
var x = 0
var y = 0
var state = 1
var a = 0
var rate = 0.1
var rateForm
var rand1 = 7
var rand2 = 0.001
var Sin = 0
var nn = 5
var ts = [];
var thr1=0.001,thr2=0.003;
var doubleClick;
var count1 = 0;
var link,link1;
function setup() {

  noCursor();
  createCanvas(windowWidth,windowHeight)
  noFill()
  frameRate(60)
  mouseX = 0.5*windowWidth
  mouseY = 0.5*windowHeight
  textFont("Helvetica")
  randomSeed(1)
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function draw() {
  Sin = millis()*0.00618/nn;
  /* single form chance* 0.05*/
  if (random(0,1)< thr1){
    // rand1 = random(8);
    // rand2 = random(0.0001,0.0099);
    rand1 = map(mouseY,0,height,0,9);
    rand2 = map(mouseX,0,width,0.0001,0.0099);
  }
  /*flash* 0.1*/
  if (random(0,2) < thr2){
    state = 0
  }
  else{
    state = 1
  }
   if (state == 0||doubleClick) {
      if(random(0,1)>mouseX/width+0.3){
        push();
        fill(0);
        rect(width/2-150,height/2-150,300,300);
        pop();
      }
      else{
        push();
        fill(255);
        rect(width/2-150,height/2-150,300,300);
        pop();
      }
    }
    else if(state == 1){
      background(0)
    }  
  
  // mouse Position
  var diffX = mouseX - x
  var diffY = mouseY - y
  x += diffX * 0.1
  y += diffY * 0.1
  x = constrain(x,0.3*windowWidth,0.7*windowWidth)
  y = constrain(y,0.2*windowHeight,0.6*windowHeight)

// display Eyes
  push()
  translate(x,y);
  rotate(sin(Sin))
  // Eyes(30,0.01,2,1,255)
  pop()
  translate(0.5*width,height/2);
  scale(0.4);

  rotate(angle)
  // number of eyes
  for (var n = 0; n < 3; n++){
    push();
    translate(-50*(n+1),-50*(n+1));
    rotate(2*PI/3*n+angle*n);
    Eyes(200-n*10,rand2-(n+2)/300, rand1,3.2);
    pop();
  }
  // rotate speed
  angle += 0.007
}

function Eyes(number,z,d,size){
  // number of the circles
  for (var i = 0; i < number; i+=7){
    // stroke color red and
    stroke(255-0.8*i,0.5*255,0.5*255+0.5*i,255);
    if(state == 0||doubleClick){
      stroke(0);
    }
    var s = 1.5*abs(i-75)/80
    strokeWeight(s)
    push();
    // 2* cos small vibration
    r1 = size*(1+z*i)*i+2*cos(Sin/4+random(0,0.01));
    r2 = size*2*i/d+5*sin(Sin/2+random(0,001));
    var weiyi = 50;
    ellipse(0,200-i/weiyi,r1,r2)
    pop()
  }
}

function touchStarted(){
  thr1 = 0.1;thr2 = 0.2;
  var t1 = millis();
}

function touchEnded(){
  thr1 = 0;thr2 = 0;
  var t2 = millis();
  var t = frameCount;
  if (touches.length !== 0) {
    ts = [];
  } else {
    ts.push(t);
  }
  if (ts.length > 2) {
    ts.splice(0, 1);
  }
  if (ts[1] - ts[0] < 12) {
    doubleClick = true;
    count1+=1;
  } else {
    if(count1%2===0){
      doubleClick = false;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(50, 50, 200)
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17);
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight);
}

document.ontouchmove = function (e) {
  e.preventDefault();
}