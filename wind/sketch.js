
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
let state = -1;
let doubleClick,ts=[];
let mic,osc,filt;
let theta = 0;


function setup() {
	// mic = new p5.AudioIn();
  // mic.start();
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sinwave');
  osc.start();
  osc.freq(440);
  noCursor();
}


function draw() {
  background(255);
  theta += 0.01;
  rectMode(CENTER);
  // let theta = random(-0.5,0.5);
  let r = 400;
  beginShape();
  fill(0,0);
  for(let i = 0; i < 10; i+=random(0.5)){
    let offset = map(noise(i/10,theta),0,1,0,100);

    stroke(255/i);
    curveVertex(mouseX/i*5, mouseY);
    curveVertex(mouseX+offset, mouseY/i);
    // translate(i*100,i);
    curveVertex(r*cos(theta+i),r*sin(theta));
    curveVertex(1000+mouseY/5,sin(i/10)*500);
    curveVertex(offset/100*width,offset/100*height);
    curveVertex(offset/100*height,offset/30*width);
    // filt.freq(100);
    osc.freq(r*cos(theta+i)+r*sin(theta));
    osc.pan((constrain(map(300*tan(theta),-1000,width+1500,1,-1),-1,1)));
    curveVertex(300*tan(theta),300*(sin(theta*3+tan(theta))+4));
    curveVertex(300*(sin(theta*3+tan(theta))+4),300*tan(theta));
    
    // curveVertex(300*cos(theta),300);
    // curveVertex(mouseX, mouseY);
    // curveVertex(mouseX, mouseY);
  }
  endShape();

  // noStroke();
  fill(0,30);
  if(state==0){
    // ellipse(mouseX,mouseY,255);
  }

}









document.touchmove = function(n) {
  n.preventDefault();
}