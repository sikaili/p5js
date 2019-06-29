// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Box {
  constructor(x, y, a, b, t) {
    this.w = b*1.5;
    this.h = a*1.5;
    this.text1 = t;
    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));

  }

  contains(x, y) {
    let worldPoint = scaleToWorld(x, y);
    let f = this.body.GetFixtureList();
    let inside = f.TestPoint(worldPoint);
    return inside;
  }
  apply(xx,yy){
    let boxPoint = this.body.GetWorldCenter();
    this.xx = xx;
    this.yy = yy;
    this.body.ApplyForce(new box2d.b2Vec2(this.xx,this.yy),boxPoint);
  }

  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    textAlign(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rectMode(CENTER);
    // rect(0,0,this.w,this.h)
    translate(0,this.h/2);
    // fill(127);
    stroke(200,0);
    fill(random(150,255),random(30,100),100,random(200,255));
    textSize(this.h*(60/50));
    strokeWeight(2);
    text(this.text1,0,0);
    pop();
  }
}