var particles = [];
var stateP = 0;
var state = 0;
var count = 0;
var interval;
var rnd, rnd1, rnd2;
var nos, xoff = 0;
var canvas;
var osc,osc1,osc2,note,freq,reverb,delay,env,env1,filter1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reverb = new p5.Reverb();
  env = new p5.Envelope(0.2, 0.08, 0, 0.1);
  env1 = new p5.Envelope(5,0.2,0.2,5)
  delay = new p5.Delay();
  filter1 = new p5.LowPass();
  
  masterVolume(1)
  osc = new p5.Oscillator();
  osc.setType('triangle');
  osc.freq(240);
  osc.amp(0);
  osc.start();
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.freq(880);
  osc1.amp(0);
  osc1.start();
  reverb.process(osc, 7, 0.3);
  reverb.process(osc1, 7, 0.3);
  delay.process(osc,0.99,0.7,200)
  osc.connect(filter1)
  osc1.connect(filter1);
  frameRate(24);
  noCursor();
}

function geneP() {
  var m = new Particle1(mouseX, mouseY, random(1,3));
  particles.push(m);
  if (particles.length > 30) {
    particles.splice(2, 3);
  };
  stateP = 1;
}

function randomBang() {
  rnd = random(200);
}

function frameBang(t, min, max) {
  if (frameCount % t === 0) {
    return random(255);
  };
}

function draw() {
  filter1.freq(map(mouseX,0,width,20,10000));
  xoff += 1;
  nos = map(noise(xoff), 0, 1, 0, 150);
  background(0);
  rnd = frameBang(30, 0, 50);
  stc = color(100,100,150,180);
  fc = color(120,0,100, 10);
  if (stateP == 1) {
    for (var p = 0; p < particles.length; p++) {
      // if(state==1||state==3||mouseIsPressed){
        particles[p].steering(createVector(mouseX,mouseY),-1,140);
      // }

      // particles[p].steering(createVector(width/2,height/2),1,500);

      particles[p].applyForce(createVector(random(0,3),noise(particles[p].pos.x)*5));
      particles[p].separation(particles);
      particles[p].bord();
      particles[p].fluide(0.15);
      particles[p].update();
      particles[p].display(stc, fc);
    };
  };
  fill(255,random(0,50));
  stroke(255,random(200));
  strokeWeight(5);
  ellipse(mouseX,mouseY,180);
}



// setup: resize, touchS1, touchE0,preventMove

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);

}
function touchStarted(){
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
    masterVolume(0.3, 0.5)
  };
  var tStart = frameCount;
  state = 1;
}
function touchEnded(){
  var tEnd = frameCount;
  if (state!==3||mouseIsPressed){
    geneP();
  }
  state = 0;
  // setTimeout(saveFrames('cap','png',1,25),200);
}
function touchMoved(){
  state = 3;
}
document.ontouchmove = function (e) {
  e.preventDefault();
}
