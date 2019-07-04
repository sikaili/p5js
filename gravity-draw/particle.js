function Particle (x,y,mass,a,b,i) {
  this.pos = createVector(x,y);
  this.vel = createVector(a,b);
  this.acc = createVector(0,0);
  this.maxSpeed = 22
  this.maxForce = 0.3;
  this.maxFv = 0.06
  this.mass = mass
  if (this.mass<1.5){
    this.maxSpeed = 2
  }
  this.d = mass * 30
  this.accA = 0
  this.angle = 0
  var zoff =0
  
  
  this.applyForce = function(force){
    this.force = force.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  this.seek = function(p,positive){
    var f = p.copy()
    f.sub(this.pos)
    f.mult(this.maxSpeed)
    var steering = p5.Vector.sub(f,this.vel);
    var distance = p5.Vector.dist(this.pos,p);
    distance = constrain(distance,5,200);
    steering.mult(positive).div(distance).limit(this.maxForce)
    if (this.mass < 0.5){
      if (random(1)>0.7){
        steering.rotate(random(-0.5,0.5));
      }
      steering.div(2);
    }
    this.applyForce(steering);
  }
  this.calFv = function(){
    var nois = map(noise(zoff),0,1,-1,1)
    zoff+= 0.2
    var fV = this.vel.copy();
    var strength = this.vel.mag();
    strength = strength*strength;
    fV.mult(-1);
    if (this.mass < 1){
      if (random(0,1)>0.3){
        fV.rotate(nois*2);
      }
    }
    fV.setMag(strength);
    fV.limit(this.maxFv)
    return fV
  }
    

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.vel.y = constrain(this.vel.y, -10,10)
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.velA = constrain(this.vel.x,-0.8,0.8)
    if (abs(this.velA)>0.05){
      this.velA *= 0.5
    }
    this.angle += this.velA
  }
  this.display = function(){
  this.theta = this.vel.heading()+this.angle;
    push();
    fill(60,61,62,5);
    stroke(125,30,39,30);
    ellipse(this.pos.x,this.pos.y,this.d*(5-abs(this.vel.y+3)/3),this.d*(5-abs(this.vel.y+3)/3));
    translate(this.pos.x,this.pos.y);
    rotate(this.theta)
    stroke(random(190,255),64)
    line(0,-this.d/2*(this.vel.y+3)/8,0+random(-1,1),this.d/2*(this.vel.y+3)/8);
    pop()
  }
}