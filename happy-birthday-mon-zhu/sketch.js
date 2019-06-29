// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

document.addEventListener('ontouchmove', function(m) {
    m.preventDefault();
}, {passive: false });
document.addEventListener('touchmove', function(n) {
    n.preventDefault();
}, {passive: false });
// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];

// Just a single box this time
let boxs = [];

// The Spring that will attach to the box from the mouse
let spring;

const ttt = ["MON","ZHU","JOYEUX","ANNIV"];
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize box2d physics and create the world
  world = createWorld();
  // Make the box
  boxs[0] = new Box(width / 2, height / 2, 100, 220,"MON");
  boxs[1] = new Box(width / 2, height / 2, 150, 350,"ZHU");
  boxs[2] = new Box(width / 2, height / 2, 100, 440,"JOYEUX");
  boxs[3] = new Box(width / 2, height / 2, 120, 430,"ANNIV");

  // Make the spring (it doesn't really get initialized until the mouse is clicked)
  spring = new Spring();
  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 2, height - 5, width, 10, 0));
  boundaries.push(new Boundary(width / 2, 5, width, 10, 0));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height, 0));
  boundaries.push(new Boundary(5, height / 2, 10, height, 0));

}

function draw() {
  background(200,200,200,random(100,255));
  push();
  // textSize(20);
  // text(rotateX,width/2,height/2);
  // text(rotatey,width/2+100,height/2);
  // pop();

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Always alert the spring to the new mouse position
  spring.update(mouseX, mouseY);

  // Draw the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Draw the box
  for (let e = 0; e < boxs.length; e++){
    boxs[e].apply(map(accelerationX,-1,1,-width,width),map(accelerationY,-1,1,-height,height));
    boxs[e].display();
  }
  // Draw the spring (it only appears when active)
  spring.display();
}

// When the mouse is released we're done with the spring
function mouseReleased() {
  spring.destroy();
}

// When the mouse is pressed we. . .
function mousePressed() {
  // Check to see if the mouse was clicked on the box
  for(let e = 0; e < boxs.length; e++){
    if (boxs[e].contains(mouseX, mouseY)) {
    // And if so, bind the mouse position to the box with a spring
    spring.bind(mouseX, mouseY, boxs[e]);
    }
  }
}

document.ontouchmove = function(m) {
  m.preventDefault();
}
