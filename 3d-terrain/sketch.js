p5.disableFriendlyErrors = true;
document.addEventListener('ontouchmove', function(m) {
    m.preventDefault();
}, {passive: false });
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
let cols, rows;
let scl = 20;
let w = 2000;
let h = 1200;
let terrain = [];
let flying = 2;
var loading = true;
var state=0;
var count = 0;
var sound=[],amplitude;

function songLoad(song){
  sound[count] = song;
  count +=1;
  if(count==2){
    loading = false;
  }
}
function setup() {
  pixelDensity(1.0);
  amplitude = new p5.Amplitude();
  loadSound('assets/'+'mur'+'.m4a',songLoad);
  loadSound('assets/'+'sugar'+'.m4a',songLoad);
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl+50;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 2000; //specify a default value for now
    }
  }
}

function draw() {
  if(state==1&&!loading){
    sound[0].amp(0.3,0.5);
    sound[0].loop();
  }
  else if(!loading){
    sound[0].amp(0,0.5);
  }
  if(!loading&&abs(pmouseX-mouseX)>20){
      let speed = map(mouseY, 0.1, height, 0, 2);
      speed = constrain(speed, 0.2, 4);
      sound[1].pan(constrain(map(mouseX,0,width,-1,1),-1,1));
      sound[1].rate(speed);
      sound[1].amp(1);
      sound[1].play();
      // sound[1].play();

      background(0,0,0,100);
      if(touches.length>2||keyIsPressed){
        if(sound[0].isPlaying()){
          // sound[0].amp(0,5)
          sound[0].stop();
        }
    }
  }
  // print(amplitude.getLevel())
  var am = constrain((amplitude.getLevel()-0.3),0,0.05);
  // w = width+mouseX;
  // h = height + mouseY;
  flying += 0.08+am;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 150);
      xoff += 0.1-am;
    }
    yoff += 0.08+am;
  }
  strokeWeight(2);
  background(100,100,255,60);
  stroke(50,50,255,100);
  fill(50,50,150,200);
  scale(1.0-am*2);
  //translate(width/2, height/2);
  rotateZ(map(mouseX,0,width,-0.1,0.1));
  rotateX(1.1);
  // rotateY(mouseY/height);
  translate(-w/2,-h/2);
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      if((Mouse(0,width/2)>x-(50/map(y,0,rows+15,1,25)+1)&&Mouse(0,width/2)<x+50/map(y,0,rows+15,1,25)-1)){
        push();
        fill(0,150);
        vertex(sin(frameCount/300)*10+x*scl+random(-30,30), y*scl, terrain[x][y]-(height-mouseY)/10-y/2+Math.random()*10);
        if(state==1&&Math.random()>0.8){
          fill(0,0,100,100+mouseX/width*150);
          // vertex(sin(frameCount/600)*10+x*scl+random(-3,3), (y)*scl, terrain[x][y]+noise(flying)*-100);
          vertex(x*scl, y*scl, terrain[x][y]-noise(flying)*50+random(-3,3));
        }
        pop();
      }
      else{
        // fill(y*8-x*5+mouseX/width*50,0,mouseY/height*100,130);
        vertex(sin(frameCount/150)*10+x*scl+random(-10,5), y*scl, terrain[x][y]+noise(flying)*60+Math.random()*10-am*8000);

      }
    }
    endShape();
  }
}

function Mouse(_xy01,_mouse){
  if(_xy01 == 0){
    return(int(_mouse/width*w/scl));
  }
  else if(_xy01 ==1){
    return(int(_mouse/height*h/scl));

  }

}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function touchStarted(){
  getAudioContext().state == "running" ? '' : getAudioContext().resume();
  state=1;
}
function touchEnded(){
  state=0;
}
document.ontouchmove = function(e) {
  e.preventDefault();
}