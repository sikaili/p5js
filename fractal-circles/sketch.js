var particles = [];
var state = 0
var t,t1, t2, t3
var angle = 0
var nos,nos1,xoff=0,yoff
var wid = 20
var trees=[];
var tree1;
var count;
var table
function preload() {
  table = loadTable("assets/hanziDB.csv","csv","header");
}
function setup() {
  pixelDensity(1.0)
  createCanvas(windowWidth,windowHeight);
  tree1 = new Tree(0.5*windowWidth,0.5*windowHeight,200,1,500);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");
  // print(table.getColumn("charcter"));
}

function draw() {
  background(125,100,100);
  noFill();
  noStroke(255);
  
  tree1.display();
  if (trees.length>0){
    for(var i = 0; i<trees.length; i++){
      trees[i].display();
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function touchStarted(){
  state = 1
  t1 = frameCount
}
function touchEnded(){
  state = 0
  t2 = frameCount
  count +=1;
  var tr = new Tree(200,200,random(50,150),random(1,2),500);
  trees.push(tr)
}
document.ontouchmove = function (e) {
  e.preventDefault();
}


