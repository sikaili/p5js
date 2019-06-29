function Particle(x, y, m, r, style) {
  this.pos = createVector(x, y);
  this.mass = m;
  this.vel = createVector(3, 3);
  this.acc = createVector(0, 0);
  this.r = r * m
  this.maxSpeed = 5
  var style = style
  this.count = 0
  // this.history = [];
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
  this.steering = function(p,m,o){
      var distance = p5.Vector.dist(this.pos,p)
        var target = p.copy()
        target.sub(this.pos)
        target.normalize();
        target.mult(this.maxSpeed);
        var steer = p5.Vector.sub(target, this.velocity);
        if (o == -1){
          if (distance<250){
            steer.mult(250/distance*-1*m);
          }
          else{
            steer.mult(1) 
          }
        }
        // else if (o == 1){
        //   steer.mult(1) 
        // }
        else if (distance>400){
          steer.mult(1000) 
        }
        this.applyForce(steer);
  }
  this.separation = function(particles){
    this.disRange = 0;
    var targetAll = createVector();
    var count = 0;
    for (var j=0;j<particles.length;j++){
      this.disRange = (this.r+particles[j].r)/2.3;
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
  this.fluide = function() {
      var center = createVector(width/2,height/2);
      var distanceC = p5.Vector.dist(this.pos,center)
      if (distanceC<(height+width)/2*0.35){
        var stren = this.vel.mag()
        var strength = stren * stren / 5
        var force1 = this.vel.copy();
        force1.setMag(strength*1.5);
        force1.mult(-1);
        this.applyForce(force1);
      }
  }
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    // var v = createVector(this.pos.x,this.pos.y);
    // this.history.push(v);
    // if (this.history.length > 20) {
    //   this.history.splice(0,1);
    // }
  }
  this.display = function(m) {
    push()
    var theta = this.vel.heading() + 0.5 * PI
    if (style == 1) {
      strokeWeight(3)
      stroke(random(200),0, 50)
      fill(100,30)
      ellipse(this.pos.x, this.pos.y, this.r+m, this.r+m)
      fill(0, 140);
      stroke(255, 140)
      strokeWeight(2)
      translate(this.pos.x, this.pos.y);
      rotate(theta)
      line(0, this.r * 0.4, 0, -this.r * 0.4)
    }
    pop()
    // for (var i = 0;i<history.length;i++){
    //   point(this.history[i].x,this.history[i].y,10);
    // }
  }
}