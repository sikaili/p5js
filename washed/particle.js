function Particle111(x, y) {
  this.pos = createVector(x, y);
  this.dis = false;
  if(pixelPos.indexOf(this.pos) == -1){
    this.dis = true;
  }
  this.mass = 1;
  this.vel = createVector(10,10);
  this.acc = createVector(0,0);
  this.maxSpeed = 15;
  this.count = 0
  this.steering = function(p){
      var distance = p5.Vector.dist(this.pos,p)
      if(distance<250){
        var target = p.copy()
        target.sub(this.pos)
        target.normalize();
        target.mult(this.maxSpeed);
        var steer = p5.Vector.sub(target, this.velocity);
        this.applyForce(steer);
      }
  }

  this.applyForce = function(force) {
    var f = force.copy()
    this.force = p5.Vector.div(f, this.mass);
    this.acc.add(this.force);
  }
  this.bord = function(p) {
    var bord = 0.5 * p.bord
            // osc2.amp(env)
            // osc2.freq(freq2+sound/2)
      if (((this.pos.x > p.pos.x - bord) && (this.pos.x < p.pos.x + bord))&&((this.pos.y > p.pos.y + bord && this.pos.y <p.pos.y + bord + 0.5 * r)||(this.pos.y < p.pos.y - bord && this.pos.y > p.pos.y - bord - 0.5 * r))) {
            osc1.pan(pan);
            osc1.amp(env)
            osc1.freq(freq1); 
            env.play();

            if (random(0,1)>0.6&&abs(this.vel.y)>0.8){
              this.vel.y *= -1
            }
      }
      if (((this.pos.y > p.pos.y - bord) && (this.pos.y < p.pos.y + bord))&&((this.pos.x > p.pos.x + bord && this.pos.x <p.pos.x + bord + 0.5 * r)||(this.pos.x < p.pos.x - bord && this.pos.x > p.pos.x - bord - 0.5 * r))) {
            osc1.pan(pan);
            osc1.amp(env)
            osc1.freq(freq1); 
            env.play();
            if (random(0,1)>0.6&&abs(this.vel.x)>0.8){
              this.vel.x *= -1
            }
      }
  
  }
  
    this.separation = function(particles){
    this.disRange = this.r;
    var targetAll = createVector();
    var count = 0;
    for (var j=0;j<particles.length;j++){
      this.disRange = (this.r+particles[j].r)/5;
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
  this.fluide = function() {
    // var sound = map(this.r, 1, 200,-12,12);
    // var note2 = map(pp.pos.x, 0, width, 0, 5);
    //     note2 = Math.floor(note2);
    // var freq2 = midiToFreq(notes[note2]-12);
        var maxi = 0.5;
        var stren = this.vel.mag()
        var strength = stren * stren;
        var force1 = this.vel.copy();
        force1.setMag(strength*1.3);
        force1.mult(-1*maxi);
        this.applyForce(force1);
        // osc1.amp(env);
        // env.play();
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.set(0, 0)
  }
  this.display = function() {
    stroke(255);
    // ellipse(this.pos.x,this.pos.y,.)
    point(this.pos.x,this.pos.y);

  }

}