var particles = [];
var state = 0;
var state = 0;
var count = 0;
var stc, fc;
var interval;
var rnd, rnd1, rnd2;
var nos, xoff = 0;
var canvas;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  count += 1
  if (count % 2 !== 0) {
    geneP();
    interval = setInterval(geneP, 3);
  } else {
    clearInterval(interval);
  }
  count = count % 2;
}

function geneP() {
  var m = new Particle1(mouseX, mouseY, random(1.5));
  particles.push(m);
  if (particles.length > 10) {
    particles.splice(0, 1);
  }
  state = 1;
}

function randomBang() {
  rnd = random(200);
}

function frameBang(t, min, max) {
  if (frameCount % t === 0) {
    return random(255);
  }
}

function draw() {
  xoff += 1
  nos = map(noise(xoff), 0, 1, 0, 150);
  background(255);
  rnd = frameBang(30, 0, 50);
  stc = color(255 - rnd, 255 - rnd, 255 - rnd, 30 + nos / 10)
  fc = color(0, 5)
  if (state == 1) {
    for (var p = 0; p < particles.length; p++) {
      particles[p].separation(p);
      particles[p].steering(createVector(mouseX,mouseY),-1,200);
      particles[p].applyForce(createVector(random(-3, 2), 1));
      particles[p].bord();
      particles[p].fluide(0.09);
      particles[p].update();
      particles[p].display(stc, fc, 30);
    }
  }
}