function Walker(mass,x,y){
  noStroke()
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = mass
  this.maxspeed = 20
  this.maxforce = 0.5
  var rr = 100
  this.r = 30*mass

  randomSeed(1)

  this.gravity = function(){
    this.posM = createVector(0.5*windowWidth+random(-1/mass,1/mass),0.5*windowHeight);
    this.acc = p5.Vector.sub(this.posM,this.pos)
    this.acc = this.acc.div(this.mass)
    this.acc.normalize().div(1)
    var r = this.vel.mag()
    if (r > 2){
      this.vel.mult(0.92)
    }
    this.vel.add([random(-1.6/mass,1.6/mass),random(-1.6/mass,1.6/mass)])
  }
  
  this.applyForce = function(force){
    this.for = p5.Vector.div(force,this.mass);
    this.acc.add(this.for);
  }  

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    d = desired.mag()
    
    if (d<50){
      // var m = map(d,0,50,0.5,this.maxspeed)
      // desired.setMag(m+random(-3,3))
    }
    else{
      desired.setMag(this.maxspeed);
    }
    // Steering formula
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);

  }
  

  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0)

    
  }
  this.display = function() {
    fill(random(255),random(50),random(40),127)
    ellipse(this.pos.x,this.pos.y,rr*mass,rr*mass)
    var theta = this.vel.heading() + PI / 2;
    if (state == 0){
    fill(0,140);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2-10);
    vertex(-this.r, this.r * 2-10);
    vertex(this.r, this.r * 2-10);
    endShape(CLOSE);
    pop();
    }
  }
  


      

}