p5.disableFriendlyErrors = true;
document.addEventListener('ontouchmove', function(e) {
  e.preventDefault();
}, {
  passive: false
});
document.addEventListener('touchmove', function(n) {
  n.preventDefault();
}, {
  passive: false
});
var theta = 0;
var loading = true;
var sound;
var amplitude;
var m = 0;
function songLoad(song){
	sound = song;
	loading = false;
}
function setup() {
	amplitude = new p5.Amplitude();
  createCanvas(windowWidth,windowHeight);
  loadSound('assets/'+'sugar'+'.m4a',songLoad);

}

function draw() {
	m  = amplitude.getLevel()*1000;
	m = constrain(m,0,100);
  background(0,abs(pmouseX-mouseX)*100);
  if(m>0.01&&m<0.2){
    background(255);
  }
  if(!loading&&abs(pmouseX-mouseX)>20){
    background(255,0,0,100);
  	let speed = map(mouseY, 0.1, height, 0, 2);
  	speed = constrain(speed, 0.01, 4);
  	sound.rate(speed);
  	sound.play();
    background(0,0,0,100);

  	if(touches.length>2||mouseIsPressed){
  		if(sound.isPlaying()){
  			sound.stop();
  		}
  	}
  }

  for(let i=1; i<20; i++){
  	stroke(255,0,0);
  	let interval = width/20+mouseX/width*2*i*5+m/20;
  	// line(i*interval,0,i*interval,height);
  	for(let e=1; e<50;e++){
  		let intervalY = height/50+mouseY/height*e;
  		// line(0,e*intervalY,width,e*intervalY);
  		if(e%4==0&&Math.random()>0.4){
  			push();
  			// noStroke();
  			// fill(255,100,100,100);
  			stroke(10,0,0);
  			fill(255);
  			translate(i*interval+i*20,e*intervalY);
        theta += 0.0005;
        rotate(theta+e/(5-m/10));
  			scale(2);
  			// rotate(m/50);
  			var mX = mouseX - i*interval;
  			var mY = mouseY - e*intervalY;
  			if(m>40){
  			ellipse(mX/130+Math.random()*m/20,12+mY/130+Math.random()*m/20,12+Math.random()*m*2+mouseX/width*i+m,Math.random()*m*2+mouseY/height*i+m);
  			}
  			else{
  			ellipse(0,0,12+Math.random()*m*2+mouseX/width*i+m,12+Math.random()*m*2+mouseY/height*i+m);
  			}
  			fill(0);
  			ellipse(mX/75+Math.random()*m/3,mY/75+Math.random()*m/3,10+Math.random()*m/4+constrain((mouseX+mouseY)/(width)*i,10,1000),10+Math.random()*m/4+constrain((mouseX+mouseY)/(width)*i,10,1000));
  			fill(255,m*50);
  			ellipse(mX/100,mY/100,5,5);
  			pop();
  		}

  	}


  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
document.ontouchmove = function(d) {
  d.preventDefault();
}