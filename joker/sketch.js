document.addEventListener('ontouchmove', function (m) {
  m.preventDefault();
}, {
  passive: false
});
document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
let speed = 0.06;
let count1 = 0;
let angle = 0;
let xS = 0;
let sides = 9;
let xx = 0;
let state = -1;
let state1 = -1;
let sound, song;
let fft, peakDetect;
let ampli = 0;
let nos = 0;
let xoff = 0;
let particles = [];
let nn = -1;
let ts = [];
let doubleClick = 0;
let disTouches = 0;
let loading;
let song1;
let link, link1;
let name;
let bigs;

function songLoad(sound) {
  song = sound;
  loading = false;
  song.play();
  state1 = 0;
  state = 0;
}

function setup() {
  noiseSeed(4400);
  randomSeed(2200);
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
  loadSound("assets/hua_aac_80.m4a", songLoad);
  particles[0] = new Particle(random(width), random(height), 1, 20);
  for (let i = 0; i < 50; i++) {
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
  let param = getURLParams();
  if (param.name) {
    name = param.name;
  }
}

function draw() {
  // noise & visualisaiton
  nos = map(noise(xoff), 0, 1, -2, 2);
  xoff += 0.05;
  let spectrum = fft.analyze();
  // sum for letter amplitude, sum1 for vibration
  let sum = 0;
  let sum1 = 0;
  for (let i = 300; i < 500; i++) {
    sum += spectrum[i];
  }
  // sum = sum / 200 * 1.3;
  sum = sum / 200 * 1.1;
  if (state == 1 || state == 2) {
    sum = 0
  }

  for (let i = 100; i < 300; i++) {
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
    if (state == 1 && Math.random() > 0.7) {
      addParticles(2, mouseX, mouseY);
    } else if (state == 0 && Math.random() > 0.3) {
      addParticles(2, random(0, width) * 1.3, random(0, height) * 1.3);
    }
    addParticles(1, sum1);
    nn = 1;
    stroke(random(800), 50, 50);
    // if (random(0,1)>0.5){
    //   speed*= sin(millis()/1000)*random(1);
    // }

    if (random(0, 1) > 0.5) {
      background(150, 30, 30);
    } else {
      background(0, 0, 150);
    }
  } else {

    nn = -1;
    if (state == 0 && state1 === 0) {
      let back = constrain(map(sum, 50, 160, 0, 255), 20, 255)
      stroke(3 * back + 20 + sum + sum1 * random(20), 3 * back + 20 - sum, 3 * back + 20 - sum, 50 + back * 3)
      // background normal
      background(240, 200 + noise(sum1, mouseX) * 40, noise(sum1) * 120);
      // background(230,200,50,back/1.5);
      // hold background
    } else {
      background(noise(sum, mouseY) * 100, noise(sum1, sum) * 100, 100 + noise(sum1) * 400, sum1);
      fill(0, map(sum, 85, 110, 0, 255));
      stroke(random(0, 1600), random(-255, 255), random(-255, 255), 180);
    }
  }
  // particles
  push();
  for (i = 0; i < particles.length; i++) {
    particles[i].separation(particles, sum1, sum, nn);
    let m = createVector(nos / 2, random(-1, 1));
    // if (width > height) {
    //   let e = createVector( - 6, -4);
    // } else {
    //   let e = createVector( - 4, -6);
    // }
    // particles[i].applyForce(e);
    let n = createVector(0.5 * windowWidth, 0.5 * windowHeight);
    particles[i].applyForce(m.mult((sum - sum1 / 5) / 20));
    if (particles[i].mass < 3) {
      particles[i].steering(n, (xS * 1.5 + sum * 1.3) / 50, nn);
    }
    if (touches.length > 0 || mouseIsPressed) {
      if (touches.length > 1) {
        e = createVector(touches[0].x, touches[0].y);
      } else {
        let e = createVector(mouseX, mouseY);
      }
      if (particles[i].mass > 3) {
        particles[i].applyForce(createVector(width / 50, height / 50));
      }
      particles[i].steering(e, 1, 1, sum1);
    }
    // particles[i].steering(createVector(100,100),1,1);
    // particles[i].steering(createVector(width-100,100),1,-1);
    // particles[i].steering(createVector(100,height-100),1,-1);
    // particles[i].steering(createVector(width-100,height-100),1,-1);
    particles[i].bord();
    particles[i].fluide();
    particles[i].update();
    particles[i].display(sum1 / 3, sum1, sum);
  }
  pop();
  // // tranlate letters
  // push();
  // translate(0.5 * windowWidth + random( - 2, 2) * sum1 / 50 + nos * 10, 0.5 * windowHeight + sum / 20);
  // // if (width + height > 2900) {
  // //   scale(1.5);
  // // }
  // yM = abs(mouseY - 0.5 * windowHeight);
  // // set sides
  // sides = map(yM, 0, 0.5 * windowHeight, 8, 3);
  // sides = int(sides)+(nn+1)*3;
  // // easing
  // if (touches.length > 1) {
  //   disTouches = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
  //   let targetX = (width + height) / 4 - disTouches + 75;
  //   constrain(targetX,150,0.5*width)
  // } else {
  //   let targetX = mouseX;
  // }
  // xx = targetX;
  // // offset
  // if (width > height) {
  //   let long = width;
  // } else {
  //   let long = height;
  // }

  // dis = abs(xx - 0.5 * width);
  // dis = dis * long / width;
  // xS = map(dis, 0, long / 2, -200, 200);
  // xS = constrain(xS, -0.3 * long, 0.2 * long);
  // // global rotatation
  // rotate(angle);
  // // 
  //   for (let i = 0; i < sides; i += 1) {
  //   push();
  //   fill(0, map(sum, 85, 110, 0, 255));
  //   rotate(i * 2 * PI / sides);
  //   // textSize(230+sum/2);
  //   if(count1%2 ==1){
  //     text(name,100,0);
  //   }
  //   else{
  //     text(name, constrain(xS+200+sum*(-1*nn),-200,300), 0);
  //   }
  //   pop();
  // }
  angle += speed;
  // if(mouseIsPressed){
  //   song.jump(59,59);
  // }
  if (state == -1 || state1 == -1) {
    push();
    fill(0, 180);
    rect(0, 0, width, height);
    stroke(0, 0);
    fill(200, 100, 100, (sin(frameCount / 100 * 2 * PI) + 1) * 80);
    textSize(36);
    if (loading == false) {
      text("Double Click to Play the song", 0.5 * width, windowHeight * 0.6);
    } else {
      text("Loading the song...", 0.5 * windowWidth, windowHeight * 0.6);
    }
    textSize(20);
    textSize(18);
    // text("add '?name=' in the link to change letters, ex:song.skyl.fr/?name=GG", 0.50 * windowWidth, 0.07 * windowHeight+50);
    fill(150);
    strokeWeight(0);
    text("LI Sikai", 0.50 * windowWidth, 0.3 * windowHeight);
    text("2018", 0.50 * windowWidth, 0.3 * windowHeight + 30);
    text("Joker Powder", 0.50 * windowWidth, 0.3 * windowHeight + 130);
    // text("Mixing : TANG Xiancheng (AB Studio)", 0.5 * windowWidth, 0.57 * windowHeight+190);
    // text("Sampler : LARGE Fréderic", 0.50 * windowWidth, 0.57 * windowHeight+160);
    // text("Music, Code, Design : LI Sikai (skyl)", 0.5 * windowWidth, 0.57 * windowHeight+220);
    pop();
    // stroke(random(0, r), random(0, r), random(0, r));
    // let m = select("#name");
    // m.style("align:center;position:relative;background-color:white;width:100px;font-size:30px;float:center;padding:1vw")
    // m.position(width/2-25,height-300);
    // name = m.value();
  }
  // else{
  //   let m = select("#name");
  //   m.style("position:absolute;background-color:black;width:75px")
  //   m.position(width,0);
  //   name = m.value();
  // }
  if (accelerationX > 30 || accelerationX > 30 || accelerationX > 30) {
    speed = 0;
  }
}

function keyPressed() {
  addParticles();
  background(20, 20, 255);
  speed = 0;
  state = 1;
}

function keyReleased() {
  state = 0;

}

function touchStarted() {
  addParticles();
  background(180, 20, 20);
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
  let t = frameCount;
  if (touches.length !== 0) {
    ts = [];
  } else {
    ts.push(t);
  }
  if (ts.length > 2) {
    ts.splice(0, 1);
  }
  if (ts[1] - ts[0] < 17 && abs(mouseX - pmouseX) < 100) {
    doubleClick = 1;
  } else {
    doubleClick = 0;
  }
  if (doubleClick == 1 && loading == false) {
    if (song.isPlaying()) {
      // song.pause();
      count1++;
    } else {
      song.play();
      state1 = 0;
      mouseX = 0.5 * width;
      mouseY = 0.4 * height;
    }
  }
}

function addParticles(_da, _x, _y) {
  if (_da) {
    if (_da == 2) {
      background(0, 40);
      for (let m = 0; m < 17; m++) {
        let newParticle;
        if (_x && _y) {
          newParticle = new Particle(_x, _y, random(0, 3), 20);

        } else {
          newParticle = new Particle(random(width), random(height), random(0, 3), 20);
        }
        particles.push(newParticle);
      }
    } else {
      for (let m = 0; m < 3; m++) {
        let newParticle = new Particle(width / 2 + Math.random() * 20, height / 2 + Math.random() * 20, random(6, 24), 20);
        particles.push(newParticle);
      }
      count1 += 1;
      if (count1 > 24) {
        particles.splice(0, particles.length - 1);
        for (let n = 0; n < 5; n++) {
          addParticles(2);
        }
        count1 = 0;
      }
    }
  } else {
    if (touches.length == 0) {
      for (let m = 0; m < 20; m++) {
        let newParticle = new Particle(mouseX, mouseY, random(1, 3), 20);
        particles.push(newParticle);
      }
    }
    for (let e = 0; e < touches.length; e++) {
      for (let m = 0; m < 20; m++) {
        let newParticle = new Particle(touches[e].x, touches[e].y, random(1, 3), 20);
        particles.push(newParticle);
      }
    }
  }
  if (particles.length > 100) {
    particles.splice(0, 20);
  }
}

function touchMoved() {
  speed = -0.04;
  state = 1;
}
document.ontouchmove = function (m) {
  m.preventDefault();
}