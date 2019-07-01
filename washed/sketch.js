p5.disableFriendlyErrors = true; // disables FES

document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
var state = -1;
var doubleClick,ts=[];
var mic,osc,filt;
var rects=[];
var xoff = 0;
var yoff = 0;

function setup() {
  pixelDensity(1.0)
  noCursor();
	// mic = new p5.AudioIn();
	// mic.start();
  createCanvas(windowWidth, windowHeight);
  // osc = new p5.Oscillator();
  // osc.disconnect();
  // osc.connect(filt);
  // osc.setType('sawtooth');
  // osc.start();
  // osc.freq(0);
  for(let i = 0; i < 10; i++){
    rects[i] =  new RandomCir(random(0,width),random(0,height),random(0,2000));
  }
}


function draw() {
  Math.random()>0.9?background(0):"";
  stroke(sin(xoff)*255,sin(yoff)*255,sin(yoff+yoff)*255);
  // fill(0,1);
  strokeWeight(noise(xoff,yoff)*2);
  rectMode(CENTER);
  for(let i =0; i < rects.length; i++){
    fill(noise(i,xoff+yoff)*500-i*10,noise(yoff,i)*180-i*10,noise(xoff,yoff)*50,80);
    stroke(noise(xoff,i)*100,noise(yoff,xoff)*100,noise(yoff+yoff)*100);
    rects[i].update().xyoff(random(-0.01,0.01),-0.001);
    rects[i].display();
  }

}

function RandomShape(_x,_y,_size){
  this.x = _x;
  this.y = _y;
  this.size = _size+random(7,10);
}
function RandomCir(_x,_y,_size,_color){
  RandomShape.call(this,_x,_y,_size);
  this.color = _color;
}
RandomCir.prototype = Object.create(RandomShape.prototype);
RandomCir.prototype.update = function(){
  this.x += (noise(xoff)-0.5)*100/this.size+(mouseX-this.x)*1/this.size;
  this.y += (noise(yoff)-0.5)*50/this.size+(mouseY-this.y)*1/this.size;
  // this.size +=random(-5,5);
  return {
    xyoff : function(_x,_y){
      xoff += _x;
      yoff += _y;
    }
  }

}


RandomCir.prototype.display = function(){
  push();
  (Math.random()>0.8&&this.size<8)?fill(0):"";

  translate(this.x,this.y);
  // fill(0)
  beginShape();
  for(let s = 1; s< 10; s+=2){
    for(let theta = 0; theta < 2*PI; theta += 0.05){
      let r = this.size/s;
      let x = r * sin(theta);
      let y = r * cos(theta);
      let offset = noise(theta+this.size,xoff)*300;
      let offsety = noise(yoff,theta)*300;
      vertex(x+offset,y+offsety);
      
    }
  }
  endShape();
  pop();

}













document.touchmove = function(n) {
  n.preventDefault();
}