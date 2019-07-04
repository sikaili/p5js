function Particle(x,y,mass) {
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = mass;
  this.r = 5 * this.mass;
  this.maxAcc = 0.3;
  this.maxSpeed = 5;
  
  
  this.applyForce = function(p){
    this.force = p.copy();
    this.force.div(this.mass);
    this.acc.add(this.force);
  }
  this.resistance = function(){
    var C = 0.1;
    var vel = this.vel.mag();
    var res = vel*vel
    this.res = this.vel.copy().mult(-1)
    this.res.mult(res);
    this.res.limit(C);
    this.applyForce(this.res);
    
  }
  
  this.update = function(){
    // this.acc.limit(this.maxAcc);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.separation = function(particles){
    this.disRange = this.r;
    var targetAll = createVector();
    var count = 0;
    for (var j=0;j<particles.length;j++){
      this.disRange = (this.r+particles[j].r)/2;
      var distance = p5.Vector.dist(this.pos,particles[j].pos);
      if ((distance > 0) && (distance < this.disRange)){
        var targetS = p5.Vector.sub(particles[j].pos,this.pos);
        targetS.div(distance*-1);
        targetAll.add(targetS);
        count ++;
      }
      if (count>0){
        targetAll.div(count);
        targetAll.normalize();
        targetAll.mult(this.maxSpeed);
        var steer = p5.Vector.sub(targetAll, this.velocity);
        this.applyForce(steer);
      }

    }
  }
  
  
  this.borders = function() {
    if (this.pos.x < -this.r) this.pos.x =  width+this.r;
    if (this.pos.y < -this.r) this.pos.y = height+this.r;
    if (this.pos.x >  width+this.r) this.pos.x = -this.r;
    if (this.pos.y > height+this.r) this.pos.y = -this.r;
  }
  
  
  this.display = function(){
    fill(255/this.mass,random(100)/this.mass,random(100)/this.mass,100)
    stroke(0,100)
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }

}