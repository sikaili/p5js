document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
document.addEventListener('touchstart', Dclick,{passive: false });
document.addEventListener('dblclick', ()=>{
  state=(state+1)%2}
  , {passive: false });
var tapedTwice =false;
function Dclick(event) {
  if(!tapedTwice) {
      tapedTwice = true;
      setTimeout( function() { tapedTwice = false; }, 300 );
      return false;
  }
  event.preventDefault();
  //action on double tap goes below
  state=(state+1)%2;

  // document.getElementById("myDropdown").classList.toggle("show");

}

var inB = false;
var mp = [];
var draws = [];
var draws1 = null;
var mp1;
var mp2;
var t1=0,t2=0;
var state=0;
var yoff=0;
var xoff=0;
var theta = 0;
var osc;
var mph = [];
var count = 0;
var rec = false;
var ts = [];
var doubleClick;
var filt;
var rrr;
var mic;
var amplitude;
var drawCount = 0;
var No = 0;
var drawsN = 1;


function Prompt(){
  let _m = Object.keys(localStorage);
  var drawNo = prompt("Enter the Number of your saved drawing, or 'Cancel'\n" + "Saved drawings : "+_m + "\n" + "All your drawings are autosaved");
  // console.log(drawNo);
  if(drawNo!=null && drawNo!=""){
    draws1 = getSnapshot(drawNo);
    if(draws1!=null){
      rrr= drawNo;
      // rrr=-100;
      for(let e=0;e<draws1.length;e++){
        let dra = new Draw(e,draws1[e]);
        draws[e]= dra;
      }
    }
    else{
      resetCanvas();
    }
  }
  else{
    resetCanvas();
  }
}
function setup() {
  resetCanvas();
  filt = new p5.BandPass();
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sawtooth');
  osc.start();
  osc.freq(440);
  noCursor();
}

function addSnapshot( id )
{
  var dumps = [];
      for(var mm =0; mm<draws.length; mm++){
        var dump = draws[mm].mp.map( function( element )
        {
            return { x : int(element.x) , y : int(element.y) }
        })
        dumps.push(dump);
      } 
      // console.log(dumps);
      if(draws[0].mp.length>30&&draws1==null){
        localStorage.setItem(id , JSON.stringify(dumps) )
      }
}     

function removeSnapshot(id) 
{
  if(confirm("You are about to delete this drawing")){
    localStorage.removeItem(id) ;
    resetCanvas();
  }
}  


function getSnapshot( id )
{
  var canvas = JSON.parse(localStorage.getItem( id )) ;
  return canvas ;
}  

function resetAllSnapshots() 
{
  if(confirm("You are about to delete all your drawings")){
    localStorage.clear() ;
    rrr = 0;
  }
}

function Max(){
  let max = (Object.keys(localStorage));
  var m =[];
  for(let i = 0; i< max.length;i++){
    m[i] = parseInt(max[i]);
    if(isNaN(m[i])){
      m[i]=0;
    }
  }
  max = Math.max(...m);
  if(isNaN(max)||max==Infinity||max==null||max==-Infinity){
    max = 0;
  }
  else{
    max+=1;
  }
  return max;
}
function resetCanvas(){
  rrr = Max();
  draws1= null;
  No = 0;
  draws = null;
  draws = [];
  draws[0]= new Draw(0);
  state = 0;
}
function newSousdrawing(){
  if(draws1!==null){
    rrr = Max();
    draws1 = null;
  }
  for(let i =0;i<draws.length;i++){
    draws.m = null;
  }
  drawCount+=1;
  var draw = new Draw(drawCount);
  draw.rec = true;
  draws.push(draw);
  document.getElementById("+").style.visibility = "hidden";
  return true;
}
function draw() {
  background(255-constrain((mouseY-pmouseY)*3,0,200),30+abs((mouseY-pmouseY))*3);
  // amplitude = mic.getLevel();
  amplitude = 0.01;
  ellipse(mouseX,mouseY,5,5);
  push();
  textSize(18);
  textAlign(CENTER);
  text(rrr,0.5*width,0.9*height);
  pop();
      // START STATE
  if (state === 0&&(draws1==null)){
    push();
    // stroke(0,random(100));
    noStroke();
    fill(100,(cos(frameCount/20)+0.5)*40+random(-20,0));
    textSize(35+random(-0.2,0.2));
    textAlign(CENTER);
    textFont("avenir");
    document.getElementById("+").style.visibility = "hidden";
    text("Double-Click to Draw/Pause",0.5*windowWidth+map(noise(xoff),0,1,-5,10),map(noise(30+xoff*2),0,1,-10,10)+0.9*height-50);
    pop();
  }

  filt.freq(map(abs(mouseX-width/2),0,width/2,100,1000));
  osc.freq((mouseY-pmouseY)*15);
  filt.freq(125);
  xoff+=0.01;
  stroke(0);
  fill(0,50+constrain((mouseX-pmouseX),-20,100)+amplitude*100);
  if (state % 2 == 1) {
    draws[No].rec = true;
    document.getElementById("+").style.visibility = "hidden";
    // document.getElementById("M").style.visibility = "hidden";


    


  }
  else{
    draws[No].rec = false;
    document.getElementById("+").style.visibility = "visible";
    // document.getElementById("M").style.visibility = "visible";

  }
  for(var i = 0; i < draws.length; i++){
    if(draws[i].rec){
      No = i;
    }
    draws[i].mouse(inB);
    draws[i].display(xoff);
  }
}

// function xFloatingAmount(_x,_y){

// }
function touchStarted(){
}
function touchEnded(){
  if(rrr!=-100){
    addSnapshot(rrr);
  }
}
    for(let ii=0; ii<draws.length;ii++)
    {
        for(let e = 0; e< draws[ii].mp.length;e++)
        {
          draws[ii].mp[e].x = draws[ii].mp[e].x +200;
        }
    }



function Scale(_array,_i){
  for(let ii=0; ii<_array.length;ii++){
    if(_array[ii].mp){
      for(let e = 0; e< _array[ii].mp.length;e++){
        let smallbig = 1 + _i/10;
        _array[ii].mp[e].x *=smallbig;
        _array[ii].mp[e].y *=smallbig;
      }
    }
    else{
      for(let e = 0; e< _array[ii].length;e++){
        let smallbig = 1 + _i/10;
        _array[ii][e].x *=smallbig;
        _array[ii][e].y *=smallbig;
      }      
    }
  }
}
function keyPressed(){
  if(keyCode == 189 || keyCode == 187){
    Scale(draws,188-keyCode);
    // Scale(mm[drawsN],188-keyCode);
  }
  if(keyCode==32){
    var w=window.open('about:blank','image from canvas');
    w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");

    saveCanvas('draw_'+rrr,'tif');
  }
  if(keyCode==78){
    newSousdrawing();
  }
  if(keyCode>=49&&keyCode<54){
    rrr=-100;
    drawsN = keyCode-49;
    draws=[];
    for(var e=0;e<mm[drawsN].length;e++){
        var dra = new Draw(e,mm[drawsN][e]);
        draws[e]= dra;
    }
  }

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(50, 50, 200)

}

document.touchmove = function(n) {
  n.preventDefault();
}