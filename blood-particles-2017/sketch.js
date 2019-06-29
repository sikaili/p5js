var arrayMass = []
var arrayX = []
var arrayY = []
var arrayB = []
var state =1
var mousePosition = []
var mouseyPosition = []
var count = 0
var keyPressingX =[]
var keyPressingY =[]

var current = 0
function setup() {
  createCanvas(windowWidth,windowHeight);
  textSize(80)
  mouseX = windowWidth
  mouseY = 0

  noStroke()
  for (i=0; i<=200 ;i++){
    arrayMass[i] = random(0.5,1.1);
    arrayX[i] = random(-10, windowWidth)
    arrayY[i] = random(-10,windowHeight)
  }
  
  for (var i = 0; i<=arrayX.length;i++){
    arrayB[i] = new Walker(arrayMass[i],arrayX[i],arrayY[i]);
  }
  keyPressingX[90] = 0.3*windowWidth;
  keyPressingY[90] = 0.7*windowHeight;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function draw() {
  background(100,100,255);
  // mousePosition[current] = mouseX
  // mouseyPosition[current] = mouseY

  // current += 1
  // if (current > 10){
  //   current = 0
  // }
  // for (var n = 0;n<10;n++){
  //   stroke(100,random(50),random(50))
  //   line(mousePosition[n],0,mousePosition[n],windowHeight)
  //   line(0,mouseyPosition[n],windowWidth,mouseyPosition[n])
    
  //   noStroke()
  // }

  for (var i = 0; i<=arrayX.length;i++){
    if (state == 0){
      // target = createVector(mouseX+random(-5,5),mouseY+random(-5,5));
      if(keyIsPressed == 0){
        target = createVector(mouseX+random(-5,5),mouseY+random(-5,5));
      }
        if (keyIsDown(90)){
          var target = createVector(keyPressingX[90],keyPressingY[90]);
          push()
          fill(255);
          text("Z",0.3*windowWidth,0.7*windowHeight);
          pop()
        }
        if (keyIsDown(88)){
          var target = createVector(0.4*windowWidth,0.7*windowHeight);
          push()
          fill(255);
          text("X",0.4*windowWidth,0.7*windowHeight);
          pop()
        }
        if (keyIsDown(67)){
          var target = createVector(0.5*windowWidth,0.7*windowHeight);
          push()
          fill(255);
          text("C",0.5*windowWidth,0.7*windowHeight);
          pop()
        }
       
        

    arrayB[i].seek(target);
    arrayB[i].update();



      
    }
  else if (state == 1){
    arrayB[i].gravity()
    arrayB[i].update();

    }

    arrayB[i].display(state);
    

  }



}
function keyPressed(){
  state = 0
  count += 1
  print(count)
}

function keyReleased(){
  state = 1
  count -=1
  print(count)

}
function touchStarted(){
  state = 0
}

function touchEnded(){
  state = 1
}

document.ontouchmove = function (e) {
  e.preventDefault();
}






