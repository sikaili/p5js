let y = 0;
let xoff = 0;
let osc,osc1,osc2;
let filt;
let theta = 0;
let freq1 = 0;
let interval = 5;
let state = -1;
let count = 0;
function setup() {
  // setupOsc(12001, 3335);

  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
  filt = new p5.BandPass();
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sine');
  osc.start();
  osc.freq(440);
  osc1 = new p5.Oscillator();
  osc1.disconnect();
  osc1.connect(filt);
  osc1.setType('sawtooth');
  osc1.start();
  osc1.freq(440);
  osc2 = new p5.Oscillator();
  osc2.disconnect();
  osc2.connect(filt);
  osc2.setType('sine');
  // osc2.start();
  osc2.freq(440);
}

function draw() {
  xoff+= 0.05;
  if(state ==1&&random(0,1)>0.8){
    background(0);
  }else{
    background(255);
  }
  // fill(0);
  beginShape();
  translate(-300,300);
  interval = Math.floor(map(mouseY,0,height,4,10));
  for(let x = 0; x < width; x+= interval){
    // noStroke();
    fill(0,0);
    y = sin(x-width+frameCount/60)*x+mouseX*cos(frameCount/30);
    filt.freq(map(mouseY,0,height,300,0));
    freq1= 5000-x/y*height+mouseY*sin(frameCount/30);
    // sendOsc(3335,freq1);
    // freq1 = constrain(map(freq1,3000,5000,-1000,6000),50,6000);
    // print(freq1);
    Freq(freq1,x/y*height+mouseY*sin(frameCount/30)-3000);
    vertex(x/y*height+mouseY*sin(frameCount/30),y);

    vertex(x/y*width+mouseX*cos(frameCount/30),height-y+noise(frameCount/20)*100);

    if(state == 1){
        // osc2.freq(mouseY-300);
    //   if(count%4==0){
    //     vertex(mouseX,mouseY);
    //   }
    //   else if(count%4==1){
        vertex(x,mouseY-300);    //   }
        Freq(8000,8000);

    //   else if(count%4==2){
    //     vertex(floor(y*random(-1,1)),mouseX-300);
    //   }      
    //   else if(count%4==3){
    //     vertex(y/x,mouseY-300);
    //   }
    }
    else{
      // osc2.stop();
    }
    // vertex(tan(x/1000)*y,y/x);
  }

  endShape();
}


function touchStarted(){
  getAudioContext().state == "running" ? '' : getAudioContext().resume();
  state = 1;
}
function touchEnded(){
  count+=1;
  // osc.play();
  state = 0;
}
function Freq(r,n,t){
  r = constrain(r,40,19000);
  n= constrain(n,40,19000);
  t= constrain(t,40,19000);
  osc.freq(r);
  osc1.freq(n);
  osc2.freq(t);
}
function receiveOsc(address, value) {
// 	console.log("received OSC: " + address + ", " + value);
	if (address == '/wek/outputs') {
		angle = map(value[0],0,1,0,PI);
		// sides = map(value[1],0,1,3,10);
		// print(angle);
	}
}


function sendOsc(address, value) {
  console.log(value);
	socket.emit('msg', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	let socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '10.13.10.13'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (let i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}