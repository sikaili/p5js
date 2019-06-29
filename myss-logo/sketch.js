
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
var state = -1;
var doubleClick,ts=[];
var mic,osc,osc1,filt;
var x = 0;
var texts = [];
var companys = ['Amazon','Google','Facebook','Twitter',"Weight : 65 kg","Height : 173 cm",'Last Log In : 17:30:25','Friends : 232','Love','Likes : 25','Likes : 0', '22077484','Location : 86000'];
var img;
var scaleH = 1;
var bounds;
var font;

function preload(){
  img = loadImage('assets/logo.png');
  // font = loadFont('assets/fixedsys.ttf');
  font = loadFont('assets/courier.otf');
  // font = loadFont('assets/Vec.otf');
  // font = loadFont('assets/AvenirNext.otf')


}

function setup() {
  textFont(font);
	// mic = new p5.AudioIn();
	// mic.start();
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sine');
  osc.start();
  osc.freq(0);
  osc1 = new p5.Oscillator();
  osc1.disconnect();
  osc1.connect(filt);
  osc1.setType('sawtooth');
  osc1.start();
  osc1.freq(0);

  for(var i =0; i< 100; i++){
    texts[i] = new Word(random(-5,5),random(15,40),random(0,1000),random(companys.length),random(1000));
  }

  if(height>width){
    scaleH =2;
  }

}


function draw() {
  background(255);
   x+=5;
  if(x>width){
    x = 0;
  }
  if(state==1){
    fill(0,150);
    rectMode(CENTER);
    if(abs(mouseX-width/2)+abs(mouseY-height/2)<30){
      rect(width/2,height/2,540/3*scaleH,990/3*scaleH);
    }
    else{
    rect(mouseX,mouseY,540/3*scaleH,970/3*scaleH);
    }
  }
  for(var m = 0; m < texts.length; m++){
    if(texts[m].size>20){
      texts[m].update();
    }
    texts[m].display();


  }
  push();
  imageMode(CENTER);
  if(state==1){
    translate(random(-2,2),(random(0,2)));
  }
  image(img, width/2,height/2,568/3*scaleH,1003/3*scaleH);
  pop();

}









document.touchmove = function(n) {
  n.preventDefault();
}