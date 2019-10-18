let intervalX = 50;
let intervalY = 50;
let RotateObjects = [];
let luckyNo = 0;
let loading = true;
let sound = [];
let amplitude;
let capture;


function setup() {
  amplitude = new p5.Amplitude();
  scale(1.5);
  for (let i = 0; i < 1; i++) {
    loadSound("assets/sound" + i + ".m4a", songLoad);
  }
  noCursor();
  noStroke();
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let number = 0;
  for (let i = 0; i < width + intervalX; i += intervalX) {
    for (let t = 0; t < height + intervalY; t += intervalY) {
      RotateObjects[number] = new RotateObject(i, t, 30, 30);
      number++;
    }
  }
  setInterval(() => {
    luckyNo = Math.floor(Math.random() * number);
  }, 1000)
}

let count = 0;

function songLoad(song) {
  sound[count] = song;
  sound[count].setVolume(0.2);

  count += 1;
  if (count > 0) {
    loading = false;
  }
}

function draw() {
  let level = amplitude.getLevel();
  background(150, 50 * (1 + level * 200), 200);

  for (let i = 0; i < RotateObjects.length; i++) {
    let obj = RotateObjects[i];
    
    obj.update(mouseX, mouseY);
    if (!loading) {
      if (calcDistance(mouseX, mouseY, obj.x, obj.y) < 200 && !obj.notPlayable) {
        obj.bigger();
        obj.rot = true;
        if (!sound[0].isPlaying()) {
          sound[0].pan(map(obj.x, 0, width, -1, 1));
          sound[0].rate(obj.id);
          sound[0].play();
        }
      } else {
        obj.rot = false
      }
    }
    if (luckyNo == i) {
      obj.display([255, 0, 0, 100]);
    } else {
      obj.display();
    }
  }
}
function touchStarted() {
  getAudioContext().state == "running" ? '' : getAudioContext().resume();
}
function calcDistance(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

class RotateObject {
  constructor(x, y, r) {
    this.id = noise(x, y) * 100;
    this.x = x;
    this.y = y;
    this.r = r;
    this.r1 = r;
    this.outSide = false;
    this.notPlayable = true;
    this.rot = false;
  }
  bigger() {
    this.r *= this.id / 20;
  }
  update(x1, y1) {
    let distance = calcDistance(x1, y1, this.x, this.y);
    distance < 240 ? '' : distance *= 2;
    distance > 200 ? this.outSide = true : '';
    this.r = noise(frameCount / 100, this.x / 100, this.y) * 20 + 30 - distance / 20;
    this.r1 = noise(sin(frameCount / 60), this.x / 100) * 60 + 10 - distance / 400;
  }
  display(color) {
    push();
    translate(this.x, this.y);

    push();
    this.notPlayable || this.rot ? rotate(this.r) : '';
    !this.notPlayable ? fill(0) : fill(255, 0, 0);
    let scal = 1;
    if (!this.outSide) {
      scal = 1.2;
    }
    rect(0, 0, this.r * scal, this.r);
    pop();

    push();
    fill(this.outSide ? [0, 40, 49, 100] : 255);
    if (color) {
      fill(color);
      ellipse(0, 0, this.r1, this.r1);
      this.notPlayable = false;
    }
    if (!this.notPlayable) {
      fill(0, this.id, this.id * 2);
      this.r1 /= 2;
    }
    ellipse(0, 0, this.r1, this.r1);
    pop();

    pop()
  }
}

document.addEventListener(
  "ontouchmove",
  function(e) {
    e.preventDefault();
  },
  {
    passive: false
  }
);
document.addEventListener(
  "touchmove",
  function(n) {
    n.preventDefault();
  },
  {
    passive: false
  }
);