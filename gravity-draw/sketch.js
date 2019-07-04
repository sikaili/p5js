var particles = [];
var forces = []
var flowfield
var count = 0
var xoff = 0
var nos1
var yoff = 0
var n
var positive = -1
var mic, micLevel;

function setup() {
  // noCursor();
  noiseSeed(1)
  frameRate(40)
  createCanvas(windowWidth, windowHeight)
  randomSeed(1)
  background(100)
  link = createA("http://skyl.fr","http://skyl.fr");
  link.style("color:#888884;font-family:HelveticaNeue-light,Helvetica;font-size:20px;")
  link1 = createP("skyl@me.com","skyl@me.com");
  link1.style("color:#888884;font-family:Helvetica;font-size:17px;")
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
  mic = new p5.AudioIn();
  mic.start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(100);
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}

function Jet() {
  positive = -1
    // create Particles
  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(0.5 * width, 0.3 * height, random(0.5, 3), nos1, -66, n));
  }
  positive = 1
    // center black circle
  push();
  noStroke();
  fill(0, 50);
  ellipse(0.5 * width, 0.3 * height, 100, 100)
  pop()
}
function touchEnded() {
  positive = -1
    // create Particles
  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(0.5 * width, 0.3 * height, random(0.5, 3), nos1, -66, n));
  }
  positive = 1
    // center black circle
  push();
  noStroke();
  fill(0, 50);
  ellipse(0.5 * width, 0.3 * height, 100, 100)
  pop()
}
//stop loop
function keyPressed() {
  count += 1
  if (count % 2 == 0) {
    noLoop()
  } else {
    loop()
  }
}

function keyReleased() {
  count -= 1
}


function draw() {
  micLevel = mic.getLevel();
  // print(micLevel);
  if(micLevel>0.35){
    Jet();
  }
  // background(random(50,255),random(110),random(110),10)

  // refresh 
  if (touches.length == 2) {
    background(100)
  }
  //steering to the mouse
  mouseP = createVector(mouseX, mouseY)
    //define x speed and direction
  n = noise(yoff);
  nos1 = map(noise(yoff * 100), 0, 1, 0, 0.05 * width);
  if (random(1) > 0.5) {
    nos1 = -1 * nos1
  }
  yoff += 0.01
    //loop particles
  for (var i = 0; i < particles.length; i++) {
    var m = particles[i].calFv();
    n = (sin(millis() / 1000 * 2 * PI / 6) + 1) * 20
    if (particles.length < 103) {
      if (n > 20) {
        n = noise(yoff) * n
        if (particles[i].mass > 1.0) {
          particles[i].applyForce(m.mult(n));
        }
      }
    } else {
      if (random(1) > 0.5) {
        n = noise(yoff) * n;
        // particles[i].applyForce(mouseP.mult(0.3));
      } else {
        n = noise(yoff + 5) * n;
      }
    }

    // define gravity and fV
    g = createVector(0, 0.20).mult(particles[i].mass)
      // select mouse steering affected Particles
    if (particles[i].mass > 1) {
      particles[i].applyForce(m.mult(n));
    } else if (particles[i].mass < 3) {
      particles[i].seek(mouseP, -1);
      particles[i].applyForce(m.mult(n / 2));
    }
    // all apply gravity 
    particles[i].applyForce(g);
    particles[i].update();
    particles[i].display();
    // select 200
    if (particles.length > 200) {
      particles.splice(0, 160);
      background(0)
      background(100)

    }
  }
}


document.ontouchmove = function(e) {
  e.preventDefault();
}