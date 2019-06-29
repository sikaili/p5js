document.addEventListener('ontouchmove', function(e) {
    e.preventDefault();
}, {passive: false });
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });

var atrs = []
var particles = []
var state = -1
var count = 0,
  countt = 1;
var clicks = 0;
var forces = []
var texts = ['Black Hole', 'Loi', 'Universelle', 'de', 'la', 'Gravitation']
var texts1 = ['则', '万', '有', '引', '力', '法']
var sin3
var osc, osc1, osc2
var note, freq;
var t1, t2, t3, m
var reverb, delay, env, env1, filter1
var notes = [48, 63, 55, 66, 47, 55]
var doubleClick = [];
var dc
var bac
var Change

function setup() {
  bac = color(50, 0);
  sampleRate(96000)
    // pixelDensity(1);
  frameRate(60)
  reverb = new p5.Reverb();
  env = new p5.Env(0.3, 0.03, 0, 0.1);
  env1 = new p5.Env(5, 0.2, 0.2, 5)
  delay = new p5.Delay();
  filter1 = new p5.LowPass();

  masterVolume(0.2)

  osc = new p5.Oscillator();
  osc.setType('sawtooth');
  osc.freq(240);
  osc.amp(0);
  osc.start();
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.freq(880);
  osc1.amp(0);
  osc1.start();
  // osc2 = new p5.Oscillator();
  // osc2.setType('triangle');
  // osc2.freq(240);
  // osc2.amp(0);
  // osc2.start();
  Change = createP("Draw");
  Change.position(windowWidth / 30, windowHeight / 30);
  Change.touchStarted(changeMode);
  Change.style("color:#685588;font-family:HelveticaNeue-light,Helvetica;font-size:35px;")

  createCanvas(windowWidth, windowHeight)
  atrs[0] = new Attractor(windowWidth+100, windowHeight, random(20, 20));
  // atrs[1] = new Attractor(random(windowWidth),random(windowHeight), random(20,40));
  // atrs[2] = new Attractor(random(windowWidth),random(windowHeight), random(20,150));
  // atrs[3] = new Attractor(random(windowWidth/2),random(windowHeight/2), random(30,35));
  // atrs[4] = new Attractor(random(windowWidth/2),random(windowHeight/2), random(10,20));



  for (var i = 0; i < 8; i++) {
    particles[i] = new Particle(random(0, width), random(0, height), random(0.3, 2), 40, int(random(1, 3)))
  }

  textSize(15)
  textFont("Helvetica")
  textAlign(LEFT)
  // reverb.process(osc, 7, 0.3);
  // reverb.process(osc1, 7, 0.3);
  delay.process(osc, 0.99, 0.3, 400)
  osc.connect(filter1)
  osc1.connect(filter1);
  background(49,12,124);
  link = createA("http://skyl.fr","http://skyl.fr");
  link.style("color:#FF69B4;font-family:HelveticaNeue-light,Helvetica;font-size:30px;");
  link1 = createP("LI Sikai 2018","2018");
  link1.style("color:#FF69B4;font-family:Helvetica;font-size:25px;");
  link1.position(0.9 * windowWidth - 90, 0.9 * windowHeight+22);
  link.position(0.9 * windowWidth - 90, 0.9 * windowHeight);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(49,12,124);
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight + 17)
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}

function changeMode() {
  countt += 1;
  state = 6;
  if (countt % 2 === 0) {
    bac = color(120, 50);
    Change.html("Draw")
  } else {
    background(49,12,124)
    bac = color(random(0,255),random(0,50),random(0,200), 0);
    Change.html("Wipe")
  }
}

function Sin(n) {
  var i = sin(millis() / 1000 * 2 * PI / n);
  return i
}

function Cos(n) {
  var i = sin(millis() / 1000 * 2 * PI / n);
  return i
}

function touchMoved() {

  note = map(mouseX, 0, width, 0, 5);
  note = Math.floor(note);
  freq = midiToFreq(notes[note]);
  osc1.pan(map(mouseX / width, 0, 1, -0.7, 0.7))
  osc1.freq(freq);
  osc1.amp(0.5, 0.4);
  osc1.phase(mouseX / width)
  state = 4;
}

function touchStarted() {
  t1 = frameCount
    // if ((mouseX<width/10)&&(mouseY<height/10)){
    //   countt+=1;
    //   state = 6;
    //   if (countt%2===0){
    //     bac = color(0,50);
    //   }
    //   else{
    //     background(70,255);
    //     bac = color(50,0);
    //   }
    // }
    // else{
  state = 0;
  // }

  note = map(mouseX, 0, width, 0, 5);
  note = Math.floor(note);
  freq = midiToFreq(notes[note]);
  osc1.pan(map(mouseX / width, 0, 1, -0.7, 0.7))
  osc1.freq(freq + Sin(3) * 1);
  osc1.amp(0.5, 0.4);

}

function touchEnded() {
  t2 = frameCount
  t3 = t2 - t1
    // hold longer to create a bigger attractor
  amass = map(t3, 3, 150, 20, 800);
  amass = constrain(amass, 20, 500)
    // delete attractor
  for (var d = 0; d < atrs.length; d++) {
    var dele = atrs[d].border();
    if (dele == 1 && atrs.length > 0 && state !== 2 && state !== 6) {
      count -= 1
      atrs.splice(d, 1);
      state = 3
    }
  }
  // new attractor 

  // var abord = amass * 2.828*1.2
  if (state !== 2 && state !== 3 && state !== 6) {
    var at = new Attractor(mouseX, mouseY, amass);
    atrs.push(at);
  }
  state = 1;
  count += 1;
  osc1.freq(freq / 2)
  osc1.amp(0, 0.7);
  // if ((mouseX<width/10)&&(mouseY<height/10)){
  //   state = 6
  // }else{
  //   clicks+=1
  // }

}

function draw() {
  if (countt % 2 == 0 && atrs.length > 0) {
    push()
    textAlign(CENTER)
    textSize(50);
    fill(255);
    text(atrs.length, 0.5 * width, 0.8 * height);
    text(clicks, 0.5 * width, 0.8 * height - 50);
    textSize(20)
    text(str(int(millis() / 1000)) + " s", 0.5 * width, 0.8 * height + 50);
    pop()
  }

  var freq1 = map(mouseY, -0.3 * height, height, 10000, 20);
  filter1.freq(freq1);
  if (touches.length > 1 || state == 4) {
    for (var d = 0; d < atrs.length; d++) {
      var dele = atrs[d].border();
      if (dele == 1 && atrs.length > 1) {
        atrs[d].pos.x = mouseX
        atrs[d].pos.y = mouseY
        state = 2
      }
    }
  }
  background(bac);
  // START STATE
  // if (state == -1) {
  //   push()
  //   stroke(0, 0)
  //   fill(255, (Sin(1.5) + 1) * 60)
  //   textSize(30)
  //   textAlign(CENTER)
  //     // text("Please touch to interact...",0.5*windowWidth,windowHeight-250)
  //   pop()
  // }

  // Create Attractors and Particles
    // display all the attractors
  for (var l = 0; l < atrs.length; l++) {
    // var m = changeMode();
    // if (m==1){
    //   atrs[l].display(255,30);
    // }
    atrs[l].display();
    push()
      // noStroke()
      // if (l==0){
      //   fill(0);
      // }
      // else{
      //   fill(255);
      // }
      // m = l
      // while (m>texts.length-1){
      //   m = m-5
      // }

    // text(texts[m], atrs[l].pos.x-35, atrs[l].pos.y,25,50);
    // text(texts1[m], atrs[l].pos.x-35, atrs[l].pos.y-30-random(4),25,50);


    pop()
  }
  fill(255, 255, 100, 150)
  noStroke();
  if (atrs.length > 0) {
    for (var l = 0; l < atrs.length; l++) {
      for (var o = 0; o < particles.length; o++) {
        forces[o] = atrs[l].calForce(particles[o]);
        particles[o].separation(particles);
        particles[o].applyForce(forces[o]);
        particles[o].bord(atrs[l]);
        particles[o].fluide(atrs[l]);
        particles[o].update();
        particles[o].display();
      }
    }
  } else {
    for (var o = 0; o < particles.length; o++) {
      particles[o].separation(particles);
      particles[o].update();
      particles[o].display();
    }
    fill(0, 150);
    rect(0, 0, width, height);



  }
  // rect(0, height / 20, 200, 30)
}

function keyPressed(){
  if(keyCode==32){
    saveCanvas('draw_'+Math.floor(random(255)),'png');
  }
}


document.ontouchmove = function(e) {
  e.preventDefault();
}