function Particle1(x,y,m){
  this.pos = createVector(x,y);
  this.mass = m;
  this.r = 20;
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = 6;
  this.historyP = [];
  var historyPL = random(10,40);
  this.mass = m
  
  this.steering = function(p,set,radius){
    var distance = p5.Vector.dist(this.pos,p)
    var target = p.copy()
    target.sub(this.pos)
    target.normalize();
    target.mult(this.maxSpeed);
    var steer = p5.Vector.sub(target, this.velocity);
    if (set == -1){
      if (distance<radius){
        steer.mult(distance/radius*-1);
        this.applyForce(steer);
      }
    }
    // arrival
    else if(set == 1){
        if (distance<radius){
        steer.mult((radius-distance)/radius);
        this.applyForce(steer);
        }
    }
    else{
      this.applyForce(steer);
    }
  }
  this.separation = function(particles){
    this.disRange = 0;
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
        this.applyForce(steer.div(5));
      }
    }
  }
  this.applyForce = function(force) {
    var f = force.copy()
    this.force = p5.Vector.div(f, this.mass);
    this.acc.add(this.force);
  }
  this.bord = function() {
    if (this.pos.x-this.r/2>width){
      this.pos.x = -this.r/2
    }
    if (this.pos.y-this.r/2>height){
      this.pos.y = -this.r/2
    }
    if (this.pos.x+this.r/2<0){
      this.pos.x = width+this.r/2
    }
    if (this.pos.y+this.r/2<0){
      this.pos.y = height+this.r/2
    }
  }
  this.fluide = function(c) {
      // var center = createVector(width/2,height/2);
      // var distanceC = p5.Vector.dist(this.pos,center)
      // if (distanceC<(height+width)/2*0.35){
      // if (this.pos.y>0.5*height){
        var stren = this.vel.mag()
        var C = c
        var strength = stren * stren * C
        var force1 = this.vel.copy();
        force1.setMag(strength);
        force1.mult(-1);
        this.applyForce(force1);
      // }
  }
  this.update = function(){
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0);
    var his = createVector(this.pos.x,this.pos.y);
    this.historyP.push(his);
    if (this.historyP.length>historyPL){
      this.historyP.splice(0,1)
    }
  }
  this.display = function(colorS,colorF,d){
      noFill();
      ellipse(this.pos.x,this.pos.y,this.r*this.mass)
      for (i = 0;i<this.historyP.length;i++){
        var hisD = random(20,60);
        fill(colorF);
        stroke(colorS);
        ellipse(this.historyP[i].x,this.historyP[i].y,hisD-i^2);
      }
  }
}