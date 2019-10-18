document.addEventListener('ontouchmove', function(e) {
    e.preventDefault();
}, {passive: false });
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
var speed = 0.04;
var angle = 0;
var xS = 0;
var sides = 9;
var xx = 0;
var state = -1;
var state1 = -1;
var sound;
var fft, peakDetect;
var ampli = 0;
var nos = 0;
var xoff = 0;
var particles = [];
var nn = -1;
var ts = [];
var doubleClick = 0;
var disTouches = 0;
var table1;
var loading;
var song1;
var link,link1;
var array = ["我","我"];
var arrays = ["我","我","我","我","我","我","我","我","我","我"];
function preload() {
  table1 = loadTable("assets/hanziDB.csv","csv","header")
}
function songLoad(sound) {
  song = sound;
  loading = false;
}
function setup() {
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
  // pixelDensity(1.5);
  createCanvas(windowWidth, windowHeight);
  stroke(255, 255, 255);
  strokeWeight(7);
  textFont("Helvetica");
  textSize(190);
  mouseX = 0.2 * windowWidth;
  mouseY = 0.15 * windowHeight;
  particles[0] = new Particle(random(width), random(height), 1, 20, 1);
  for (var i = 0; i < 100; i++) {
    particles[i] = new Particle(random(width), random(height), random(1, 3), 20, 1);
  }
  loadSound("assets/e.m4a",songLoad);
  // link = createA("http://skyl.fr","http://skyl.fr");
  // link.style("color:#888884;font-family:HelveticaNeue-light,Helvetica;font-size:20px;")
  // link1 = createA("skyl@me.com","skyl@me.com");
  // link1.style("color:#888884;font-family:Helvetica;font-size:20px;")
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+30)
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)

}
function draw() {
  // noise & visualisaiton
  nos = map(noise(xoff), 0, 1, -2, 2);
  xoff += 0.05;

  var spectrum = fft.analyze();
  // sum for letter amplitude, sum1 for vibration
  var sum = 0;
  var sum1 = 0;
  for (var i = 30; i < 130; i++) {
    sum += spectrum[i];
  }
  for (var i = 650; i < 750; i++) {
    sum += spectrum[i];
  }
  sum = sum / 200 * 1.3;
  for (var i = 200; i < 400; i++) {
    sum1 += spectrum[i];
  }
  sum1 = sum1 / 200;
  // 
  fft.analyze();
  peakDetect.update(fft);

  // set letters
  var name = "SL";

 // background
    sum = sum
      if (peakDetect.isDetected) {
        var t = int(random(1000));
        array = split(table1.getString(t,0),";")
        nn = 1;
        stroke(255);
        if (random(0, 1) > 0.63) {
          if (random(0, 1) > 0.5) {
            background(100, 100, 255);
          } else {
            background(100, 100, 255);
          }
        } else {
          background(255);
        }
      } else {
        nn = -1;
          if (state == 0) {
            stroke(255,180);
            var back = constrain(map(sum, 50,160,10,255),10,255)
            background(random(50,100),random(50,100),random(220,255),back);
            background(0,back);

          }else {
            if (random(1)>0.1){
              background(0,125);
            }
            else{
              background(255);
            }
            stroke(random(100, 800), random(100, 800), random(100, 800));
          }
    }
  // particles
   push();
  for (i = 0; i < particles.length; i++) {
    particles[i].separation(particles);
    var m = createVector(nos / 2, random( - 1, 1));
    if (width > height) {
      var e = createVector( - 6, -4);
    } else {
      var e = createVector( - 4, -6);
    }
    particles[i].applyForce(e);
    var n = createVector(0.5 * windowWidth, 0.5 * windowHeight);
    particles[i].applyForce(m.mult(sum / 20));
    particles[i].steering(n, (xS + sum * 1.3) / 50, nn);
    if (touches.length > 0 || mouseIsPressed) {
      if (touches.length > 1) {
        e = createVector(touches[0].x, touches[0].y);
      } else {
        var e = createVector(mouseX, mouseY);
      }
      particles[i].steering(e, 1, 1);
    }
    particles[i].bord();
    particles[i].fluide();
    particles[i].update();
    particles[i].display(sum1 / 3,[100, 150, random(255)]);
  }
  pop();
  // tranlate letters
  push();
  // translate(0.5 * windowWidth + random( - 2, 2) * sum1 / 50 + nos * 10, 0.5 * windowHeight + sum / 20);
  translate(0.5*width,0.5*height);

  if (width + height > 2900) {
    scale(1.5);
  }
  yM = abs(mouseY - 0.5 * windowHeight);
  // set sides
  sides = map(yM, 0, 0.5 * windowHeight, 7, 3);
  sides = int(sides)+(nn+1)*3;
  // easing
  if (touches.length > 1) {
    disTouches = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    var targetX = (width + height) / 4 - disTouches + 75;
    constrain(targetX,150,0.5*width)
  } else {
    var targetX = mouseX;
  }
  xx += (targetX - xx) * 0.3;
  // offset
  if (width > height) {
    var long = width;
  } else {
    var long = height;
  }
  dis = abs(xx - 0.5 * width);
  dis = dis * long / width;
  xS = map(dis, 0, long / 2, -200, 200);
  xS = constrain(xS, -0.2 * long, 0.2 * long);
  // global rotatation
  rotate(angle);
  // 
  for (var i = 0; i < sides; i += 1) {
    push();
    fill(0, map(sum, 85, 110, 0, 255));
    rotate(i * 2 * PI / sides);
    if (sum < 20){
      sum = (-sum)*0.2;
    }
    else if (sum <78){
      sum = sum/(78-sum);
    }
    sum = constrain(sum,0,400)
    text(array[1], xS + 200 + sum*nn*-1, 0);
    pop();
  }
  pop();
  angle += speed;
  // signature

  // start state 
  if (state == -1 || state1 == -1) {
    push();
    fill(0, 180);
    rect(0, 0, width, height);
    stroke(0, 0);
    fill(200,100,100, (sin(frameCount / 100 * 2 * PI) + 1) * 80);
    textSize(36);
    textAlign(CENTER);
    if (loading == false){
      text("Double-Click to PLAY/STOP the song", 0.5 * width, windowHeight * 0.6);
    }else{
      text("Loading the song...", 0.5 * windowWidth, windowHeight * 0.6);
    }
    textSize(20);
    fill(150);
    strokeWeight(0);
    text("LI Sikai", 0.50 * windowWidth, 0.3 * windowHeight);
    text("2017", 0.50 * windowWidth, 0.3 * windowHeight+30);
    pop();
  }
  if (accelerationX > 30 || accelerationX > 30 || accelerationX > 30) {
    speed = 0;
  }
}
function addParticles(){
  for(var m = 0; m < 20; m++){
    var newParticle = new Particle(mouseX, mouseY, random(1, 3), 20, 1);
    particles.push(newParticle);
  }
  if(particles.length > 110){
    particles.splice(0,20);
  }
}
function touchStarted() { 
  getAudioContext().state == "running" ? '' : getAudioContext().resume();
  addParticles();
  background(255);
  speed = 0;
  state = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mouseX = 0.65 * windowWidth;
  mouseY = 0.35 * windowHeight;
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+30);
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight);
}
function touchEnded() {
  background(0);
  speed = 0.04;
  state = 0;
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
    doubleClick = 1;
  } else {
    doubleClick = 0;
  }
  if (doubleClick == 1&& loading == false) {

    if (song.isPlaying()) {
      song.pause();
      state1 = -1;
    } else {
      song.play();
      state1 = 0;
    }
  }
}
function touchMoved() {
  speed = -0.06;
  state = 2;
}
document.ontouchmove = function(e) {
  e.preventDefault();
}