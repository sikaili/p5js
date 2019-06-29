function Particle(x, y, m, r) {
  this.pos = createVector(x, y);
  this.mass = m;
  this.vel = createVector(3, 3);
  this.acc = createVector(0, 0);
  this.r = r * m
  this.maxSpeed = 5
  var style = style
  this.count = 0
  this.his = [];
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
  this.steering = function(p,m,o,_sum1){
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
        if(o == 1){
          if (distance>150+_sum1*3&&distance<width/2){
            steer.mult(20);
          }
          else if(distance>(width+height)/4){
            steer.mult(-1);

          }
          else{
            steer.mult(-0.5);
          }
        }
        this.applyForce(steer);
  }
  this.separation = function(particles,sum1,sum,_nn){
    this.disRange = 0;
    var targetAll = createVector();
    var count = 0;
    for (var j=0;j<particles.length;j++){
      this.disRange = (this.r+particles[j].r)/map(sum1,0,255,5,0);
      var distance = p5.Vector.dist(this.pos,particles[j].pos);
      var heading = p5.Vector.sub(this.pos,particles[j].pos).heading();
      var angle = map(sum1,0,128,-PI/8,PI/8);

      if(state==1){
        angle = atan2(mouseY-height/2,mouseX-width/2);
      }
      if((distance>395&&distance<200*constrain(this.mass,0,6)||state == 1||j<10) && ((heading < 0.03*PI+angle && heading > -0.03*PI+angle)||(this.mass>24 && particles[j].mass>10))||distance<50){
        sum1 = constrain(sum1,50,250);
        // stroke(random(500),sum1,sum+25,sum1);
        stroke(random(400)-sum1,sum1);
        stroke(random(255),random(50),random(50),sum1)
        // stroke(15+this.mass*3+noise(this.pos.y,this.pos.x)*125+sum1/2,noise(this.vel.mag())*220-this.mass*35+sum/1.2,sum/1.2-sum/2.5-sum1+250/this.mass+30);
        // stroke(random(0,25),random(300),random(300),sum1);

        if(Math.random()>0.9){
          stroke(0);
        }
        strokeWeight(constrain(this.mass*1.5,1.5,4));
        if(state==1){
          if(Math.random()>0.2&&distance>400){
            line(particles[j].pos.x,particles[j].pos.y,this.pos.x,this.pos.y);
          }
        }
        else{
          line(particles[j].pos.x,particles[j].pos.y,this.pos.x,this.pos.y);
          // bezier(this.pos.x, this.pos.y,particles[0].pos.x,particles[0].pos.y,width/2,height/2,particles[j].pos.x,particles[j].pos.y);

        }
        if(Math.random()>0.94){
          strokeWeight(0.5);
          stroke(50,random(500),random(500));
          bezier(this.pos.x, this.pos.y,width/2, height/2,mouseX,mouseY,particles[j].pos.x,particles[j].pos.y);
        }

      }
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
    var v = createVector(this.pos.x,this.pos.y);
    this.his.push(v);
    if (this.his.length > 10) {
      this.his.splice(0,9);
    }
  }
  this.display = function(m,sum,sum1) {
    push()
    sum1 = constrain(sum1,0,100);
    var theta = this.vel.heading() + 0.5 * PI;
      strokeWeight(1-this.mass/2);
      stroke(sum1*2.5+sum+noise(this.pos.y,this.pos.y)*150,sum1*2.5+noise(this.pos.x)*100-100,sum1/3-100,180);
      // stroke(100+this.mass*3+noise(this.pos.y,this.pos.x)*125+sum1/2,sum1/10+noise(this.vel.mag())*100-this.mass*20+sum/1.2+70,sum/1.2-sum/2.5-sum1/1.2+250/this.mass-50);
      if(Math.random()*sum>120){
        fill(-sum1/2+sum+noise(this.pos.y,this.pos.y)*150,sum1+noise(this.pos.x)*100,sum1/3+100);
        if(Math.random()>0.7){
          fill(180,50,50);
        }
        
      }
      if(this.mass>4){
        strokeWeight(0);
        stroke(50,80,255-this.mass*3,sum1);
        fill(50,80,255-this.mass*3,180);
        this.r2 =this.r/4+sum1/5;
        // fill(0,0)
        // noStroke();
      }
      else{
        this.r2 = this.r
        fill(100,noise(this.pos.x)*255,255-noise(this.pos.x)*255,30);
      }
      ellipse(this.pos.x, this.pos.y, this.r2+m, this.r2+m)
      fill(0, 140);
      stroke(200, 140/this.mass);
      strokeWeight(1);
      translate(this.pos.x, this.pos.y);
      rotate(theta);
      if(this.mass>6){
        push()
        rotate(-theta/1.5);
        this.mass1 = map(this.mass,6,24,1.5,3);
        this.r1 = this.r/2.5-sum1/2;
        fill(random(30,60)*this.mass1*2,250)
        ellipse(0,0,this.r1*this.mass1/2.5,this.r1)
        fill(0,180)
        ellipse(-this.r1/(10-this.mass1)+this.r1/10*(sin(millis()/1000)),0,this.r1/1.8)
        fill(200+this.mass1*20,255)
        ellipse(-this.r1/(10-this.mass1),this.r1/8,this.r1/6)
    // fill(random(0,50),200)
    // textSize(this.r);
    // text("s",-this.r/1.6,this.r/3);
        pop()
      }
      else{
        line(0, (this.r+m/2) * 0.4, 0, (-this.r-m/2) * 0.4);
      }

    pop()
    for (var i = 0;i<this.his.length;i++){
      point(this.his[i].x,this.his[i].y)
    }
  }
}