function Particle1(x,y,m){
  this.pos = createVector(x,y);
  this.mass = m;
  this.r = 50*this.mass;
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = 6;
  this.historyP = [];
  var historyPL = random(3,10);
  var trans;
  this.mass = m
  
  this.steering = function(p,set,radius){
    var distance = p5.Vector.dist(this.pos,p)
    var target = p.copy()
    target.sub(this.pos)
    target.normalize();
    target.mult(this.maxSpeed);
    var steer = p5.Vector.sub(target, this.velocity);
    if (set == -1){
      if (distance<=radius){
        notes = [48, 50, 53, 45, 51, 52];
        // var note1 = floor(map(this.pos.x,0,width,0,6.5));
        var note1 = floor(random(0,6.5));

        this.freq1 = midiToFreq(notes[note1]-12);
        var pan = map(this.pos.x, 0, width, -1, 1);
        osc.pan(pan);
        osc.amp(env);
        osc.freq(this.freq1 * (1.414^floor(map(this.pos.y,0,height,8,1))));
        env.play();
        background(170,0,0,75);
        steer.mult(distance/radius*-1);
        this.applyForce(steer);
        // this.mass = this.mass*2
        trans = true;
      }
      else{
        // this.mass = m
        trans = false;
      }
    }
    // arrival
    else if(set == 1){
        if (distance<radius){
          steer.mult(distance/radius);
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
        var stren = this.vel.mag()
        var C = c
        var strength = stren * stren * C
        var force1 = this.vel.copy();
        force1.setMag(strength);
        force1.mult(-1);
        this.applyForce(force1);
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
  this.display = function(colorS,colorF){
      fill(colorF);
      stroke(colorS);
      // ellipse(this.pos.x,this.pos.y,this.r*this.mass)
      // for (i = 0;i<this.historyP.length;i++){
      //   var hisD = random(30,random(50,150));
      //   fill(colorF);
      //   stroke(colorS);
      //   ellipse(this.historyP[i].x,this.historyP[i].y,hisD);
      // }
      if (!trans||random(0,1)>0.4){
        var rand1 = map(this.pos.y,0,height,5,8);
        var rand2 = map(this.pos.x,0,0.5*width,0.0001,0.001);
      }else{
        if (random(0,1)>0.6){
          background(255);
        }
        var rand1 = random(0,8);
        var rand2 = random(0.008,0.0001)
      }
      var theta = this.vel.heading()+PI/2;
      push()
      translate(this.pos.x,this.pos.y);
      rotate(theta);
      Eyes(200,rand2-(this.mass)/300,rand1+(this.mass-1)/800,this.mass);
      pop();
  }
  function Eyes(number,z,d,size){
    for (var i = 0; i < number; i+=7){
      // stroke(255-0.8*i,125,0.5*255+0.8*i*size,size*100)
      stroke(10+8000/(abs(i-number/random(1,4))*size),120/size,150/size)
      noFill();
      var s = 2*abs(i-75)/75
      strokeWeight(s)
      push();
      // if (keyIsPressed){
      //   noLoop();
      //   print(z);
      //   print(d);
      // }
      
      r1 = size*(1+z*i)*i+2*cos(sin(millis()/1000)/4+random(0,0.01));
      r2 = size*2*i/d+5*sin(sin(millis()/1000)/2+random(0,001));
      // if (keyIsPressed){
      //   noLoop();
      //   // print(z);
      //   print(size);
      //   print(r1);
      // }
      // var weiyi = constrain(map(mouseX,0.3*height,0.7*height,1,5),0.5,100);
      var weiyi = 100;
      ellipse(0,0-i/weiyi,r1,r2)
      pop()
    }
  }
}