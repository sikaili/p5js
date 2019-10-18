let intervalX, intervalY;
let RotateObjects = [];
let luckyNo;
let loading = true;
let sound = [];
let amplitude;
let capture;

let mode = 'create';

function setup() {
  function songLoad(song) {
    sound[count] = song;
    sound[count].setVolume(0.3);

    count += 1;
    if (count > 0) {
      loading = false;
    }
  }
  amplitude = new p5.Amplitude();
  scale(1.5);
  for (let i = 0; i < 1; i++) {
    loadSound("assets/sound" + i + ".m4a", songLoad);
  }
  noCursor();
  noStroke();
  createCanvas(windowWidth, windowHeight);
  [intervalX, intervalY] = [(width + height) / 40, (width + height) / 40];
  rectMode(CENTER);
  let number = 0;
  for (let i = 0; i < width + intervalX; i += intervalX) {
    for (let t = 0; t < height + intervalY; t += intervalY) {
      RotateObjects[number] = new RotateObject(i, t, intervalX);
      number++;
    }
  }
  setInterval(() => {
    luckyNo = Math.floor(Math.random() * number);
  }, 1000)
}

let count = 0;



function draw() {
  if (keyIsPressed) {
    let min = RotateObjects.filter(obj => calcDistance(obj.x, obj.y, mouseX, mouseY) < intervalX).sort()[0];
    luckyNo = RotateObjects.indexOf(min);
  }
  let level = amplitude.getLevel();
  background(150, 50 * (1 + level * 200), 200);
  for (let i = 0; i < RotateObjects.length; i++) {
    let obj = RotateObjects[i];
    obj.update(mouseX, mouseY);
    if (obj.mode === 'inside') {
      vertex(obj.x, obj.y);
    }
    if (!loading) {
      if (calcDistance(mouseX, mouseY, obj.x, obj.y) < 200 && obj.playble) {
        obj.bigger();
        obj.rot = true;
        if (!sound[0].isPlaying()) {
          sound[0].pan(map(obj.x, 0, width, -1, 1));
          sound[0].rate(obj.id / 3);
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
  let min = RotateObjects.filter(obj => calcDistance(obj.x, obj.y, mouseX, mouseY) < intervalX).sort()[0];
  luckyNo = RotateObjects.indexOf(min);
  getAudioContext().state == "running" ? '' : getAudioContext().resume();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};

function calcDistance(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

document.addEventListener(
  "ontouchmove",
  function (e) {
    e.preventDefault();
  }, {
    passive: false
  }
);
document.addEventListener(
  "touchmove",
  function (n) {
    n.preventDefault();
  }, {
    passive: false
  }
);