document.addEventListener('ontouchmove', function(m) {
    m.preventDefault();
}, {passive: false });
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
var speed = 0.06;
var count1 = 0;
var angle = 0;
var xS = 0;
var sides = 9;
var xx = 0;
var state = -1;
var state1 = -1;
var sound,song;
var fft, peakDetect;
var ampli = 0;
var nos = 0;
var xoff = 0;
var particles = [];
var nn = -1;
var ts = [];
var doubleClick = 0;
var disTouches = 0;
var loading;
var song1;
var link,link1;
var name;
function songLoad(sound) {
  song = sound;
  loading = false;
}

function setup() {
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
  createCanvas(windowWidth, windowHeight);
  stroke(255, 255, 255);
  strokeWeight(10);
  textFont("Helvetica");
  textAlign(CENTER);
  textSize(230);
  mouseX = 0.35 * windowWidth;
  mouseY = 0.35 * windowHeight;
  loadSound("assets/hua_aac_80.m4a",songLoad);
  particles[0] = new Particle(random(width), random(height), 1, 20);
  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle(random(width), random(height), random(1, 3), 20);
  }
  // link = createA("http://skyl.fr","http://skyl.fr");
  // link.style("color:#888884;font-family:HelveticaNeue-light,Helvetica;font-size:20px;")
  // link1 = createP("skyl@me.com","skyl@me.com");
  // link1.style("color:#888884;font-family:Helvetica;font-size:17px;")
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
  frameRate(30);

  name = "SL"
  var param = getURLParams();
  if (param.name){
    name = param.name;
  }
}

function draw() {
  // noise & visualisaiton
  nos = map(noise(xoff), 0, 1, -2, 2);
  xoff += 0.05;
  var spectrum = fft.analyze();
  // sum for letter amplitude, sum1 for vibration
  var sum = 0;
  var sum1 = 0;
  for (var i = 500; i < 700; i++) {
    sum += spectrum[i];
  }
  // sum = sum / 200 * 1.3;
  sum = sum / 200 * 1.1;
  if (state == 1||state == 2){
    sum = 0
  }

  for (var i = 200; i < 400; i++) {
    sum1 += spectrum[i];
  }
  sum1 = sum1 / 200;

  // 
  fft.analyze();
  peakDetect.update(fft);
  // set letters
  
  // start state
  r = constrain((millis() / 8) ^ 2, 0, 2000);
  stroke(random(0, r), random(0, r), random(0, r));
  // background
    // sum = sum
      if (peakDetect.isDetected) {
        nn = 1;
        stroke(random(800),50,50);
        // if (random(0,1)>0.5){
        //   speed*= sin(millis()/1000)*random(1);
        // }
        
          if (random(0, 1) > 0.5) {
            background(255, 100, 150);
          } else {
            background(255);
          }
      } else {

        nn = -1;
          if (state == 0 && state1 ===0) {
            var back = constrain(map(sum, 50,160,20,255),20,255)
            stroke(3*back+20+sum+sum1*random(20),3*back+20-sum,3*back+20-sum,50+back*3)
            background(0,back);
          }else {
            background(0,60);
            fill(0, map(sum, 85, 110, 0, 255));
            stroke(random(0, 1600), random(-255, 255), random(-255, 255),180);
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
  translate(0.5 * windowWidth + random( - 2, 2) * sum1 / 50 + nos * 10, 0.5 * windowHeight + sum / 20);
  // if (width + height > 2900) {
  //   scale(1.5);
  // }
  yM = abs(mouseY - 0.5 * windowHeight);
  // set sides
  sides = map(yM, 0, 0.5 * windowHeight, 8, 3);
  sides = int(sides)+(nn+1)*3;
  // easing
  if (touches.length > 1) {
    disTouches = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    var targetX = (width + height) / 4 - disTouches + 75;
    constrain(targetX,150,0.5*width)
  } else {
    var targetX = mouseX;
  }
  xx = targetX;
  // offset
  if (width > height) {
    var long = width;
  } else {
    var long = height;
  }
  
  dis = abs(xx - 0.5 * width);
  dis = dis * long / width;
  xS = map(dis, 0, long / 2, -200, 200);
  xS = constrain(xS, -0.3 * long, 0.2 * long);
  // global rotatation
  rotate(angle);
  // 
    for (var i = 0; i < sides; i += 1) {
    push();
    fill(0, map(sum, 85, 110, 0, 255));
    rotate(i * 2 * PI / sides);
    // textSize(230+sum/2);
    if(count1%2 ==1){
      text(name,100,0);
    }
    else{
      text(name, constrain(xS+200+sum*(-1*nn),-200,300), 0);
    }
    pop();
  }
  pop();
  angle += speed;
  if (state == -1 || state1 == -1) {
    push();
    fill(0, 180);
    rect(0, 0, width, height);
    stroke(0, 0);
    fill(200,100,100, (sin(frameCount / 100 * 2 * PI) + 1) * 80);
    textSize(36);
    if (loading == false){
      text("Double-Click to PLAY/STOP the song", 0.5 * width, windowHeight * 0.6);
    }else{
      text("Loading the song...", 0.5 * windowWidth, windowHeight * 0.6);
    }
    textSize(20);
    textSize(18);
    text("add '?name=' in the link to change letters, ex:song.skyl.fr/?name=GG", 0.50 * windowWidth, 0.07 * windowHeight+50);
    fill(150);
    strokeWeight(0);
    text("LI Sikai", 0.50 * windowWidth, 0.3 * windowHeight);
    text("2017", 0.50 * windowWidth, 0.3 * windowHeight+30);
    // text("Music : LI Sikai", 0.50 * windowWidth, 0.6 * windowHeight+130);
    text("Mixing : TANG Xiancheng (AB Studio)", 0.5 * windowWidth, 0.57 * windowHeight+190);
    text("Sampler : LARGE Fréderic", 0.50 * windowWidth, 0.57 * windowHeight+160);
    text("Music, Code, Design : LI Sikai (skyl)", 0.5 * windowWidth, 0.57 * windowHeight+220);
    pop();
    // stroke(random(0, r), random(0, r), random(0, r));
    // var m = select("#name");
    // m.style("align:center;position:relative;background-color:white;width:100px;font-size:30px;float:center;padding:1vw")
    // m.position(width/2-25,height-300);
    // name = m.value();
  }
  // else{
  //   var m = select("#name");
  //   m.style("position:absolute;background-color:black;width:75px")
  //   m.position(width,0);
  //   name = m.value();
  // }
  if (accelerationX > 30 || accelerationX > 30 || accelerationX > 30) {
    speed = 0;
  }
}
function touchStarted() {
  addParticles();
  background(255);
  speed = 0;
  state = 1;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mouseX = 0.65 * windowWidth;
  mouseY = 0.35 * windowHeight;
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}
function touchEnded() {
  background(0);
  speed = 0.075;
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
  if (ts[1] - ts[0] < 17&&abs(mouseX-pmouseX)<100) {
    doubleClick = 1;
  } else {
    doubleClick = 0;
  }
  if (doubleClick == 1&& loading == false) {

    if (song.isPlaying()) {
      state1=-1;
      song.pause();
      count1++;
    } else {
      song.play();
      state1 = 0;
      mouseX = 0.5*width;
      mouseY = 0.4*height;
    }
  }
}

function addParticles(){
  for(var m = 0; m < 20; m++){
    var newParticle = new Particle(mouseX, mouseY, random(1, 3), 20);
    particles.push(newParticle);
  }
  if(particles.length > 110){
    particles.splice(0,20);
  }
}
function touchMoved() {
  speed = -0.04;
  state = 2;
}
document.ontouchmove = function(m) {
  m.preventDefault();
}