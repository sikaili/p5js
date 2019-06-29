function Particle(x, y, m, r, style) {
  this.pos = createVector(x, y);
  this.mass = m;
  this.vel = createVector(1, 1);
  this.acc = createVector(0, 0);
  this.r = 40 * m
  this.maxSpeed = 2;
  var style = style
  this.count = 0
  this.state = 1
  this.freq1 = 0
  this.applyForce = function(force) {
    var f = force.copy()
    this.force = p5.Vector.div(f, this.mass);
    this.acc.add(this.force);
  }
  this.bord = function(p) {
    var bord = 0.5 * p.bord
    var r = 50
      // var note1 = map(this.r, 1, 50, 0, 5);
      // var sound = map(note1, 0, 5,-12,12);
      // note1 = Math.floor(note1);

    // // var note1 = map(this.mass, 0.3, 2, 5, 0);
    // note1 = Math.floor(note1);
    // var freq1 = midiToFreq(notes[note1]+12);
    // var note2 = map(p.pos.x, 0, width, 0, 5);
    // note2 = Math.floor(note2);
    // var freq2 = midiToFreq(notes[note2]-12);
    // var pan = map(note2, 0, 5, -1,1);

    // osc2.amp(env)
    // osc2.freq(freq2+sound/2)
    if (((this.pos.x > p.pos.x - bord) && (this.pos.x < p.pos.x + bord)) && ((this.pos.y > p.pos.y + bord && this.pos.y < p.pos.y + bord + 0.5 * r) || (this.pos.y < p.pos.y - bord && this.pos.y > p.pos.y - bord - 0.5 * r))) {
      // osc1.pan(pan);
      // osc1.amp(env)
      // osc1.freq(freq1); 
      // env.play();
      if (random(0, 1) > 0.6 && abs(this.vel.y) > 0.8) {
        this.vel.y *= -1
      }
    }
    if (((this.pos.y > p.pos.y - bord) && (this.pos.y < p.pos.y + bord)) && ((this.pos.x > p.pos.x + bord && this.pos.x < p.pos.x + bord + 0.5 * r) || (this.pos.x < p.pos.x - bord && this.pos.x > p.pos.x - bord - 0.5 * r))) {
      // osc1.pan(pan);
      // osc1.amp(env)
      // osc1.freq(freq1); 
      // env.play();
      if (random(0, 1) > 0.6 && abs(this.vel.x) > 0.8) {
        this.vel.x *= -1
      }
    }

  }

  this.separation = function(particles) {
    this.disRange = this.r;
    var targetAll = createVector();
    var count = 0;
    for (var j = 0; j < particles.length; j++) {
      this.disRange = (this.r + particles[j].r) / 2;
      var distance = p5.Vector.dist(this.pos, particles[j].pos);
      if ((distance > 240) && (distance < 241)) {
        var note1 = random(6);
        var sound = map(note1, 0, 6, 0, 6);

        // note1 = distance - 240
        // var sound = map(note1, 0, 1, 0, 6);
        note1 = Math.floor(sound);
        // var note1 = map(this.mass, 0.3, 2, 5, 0);
        this.freq1 = midiToFreq(notes[note1]);
        var pan = constrain(map(this.pos.x, 0, width, -1, 1),-0.9,0.9);
        // if (this.freq1 == particles[j].freq1){
        osc.pan(pan);
        osc.amp(env)
        osc.freq(this.freq1 * (1.414^floor(random(3))));
        env.play();
        // }
        push();
        stroke(random(-100, 350), 255);
        strokeWeight(2+random(-0.5,1));
        // push();
        // noStroke();
        // fill(0, 20);
        // textSize(25);
        // text(int(this.freq1), (this.pos.x + particles[j].pos.x) / 2, this.pos.y)
        // pop()
        line(this.pos.x, this.pos.y, particles[j].pos.x, particles[j].pos.y);
        pop();
        this.state = 0
      } else {
        this.state = 1
      }
      if ((distance > 0) && (distance < this.disRange)) {
        var targetS = p5.Vector.sub(particles[j].pos, this.pos);
        targetS.div(distance * -1);
        targetAll.add(targetS);
        count++;
      }
      if (count > 0) {
        targetAll.div(count);
        targetAll.normalize();
        targetAll.mult(this.maxSpeed);
        var steer = p5.Vector.sub(targetAll, this.velocity);
        this.applyForce(steer);
      }

    }
  }
  this.fluide = function(pp) {
    // var sound = map(this.r, 1, 200,-12,12);
    // var note2 = map(pp.pos.x, 0, width, 0, 5);
    //     note2 = Math.floor(note2);
    // var freq2 = midiToFreq(notes[note2]-12);
    if ((this.pos.x > pp.pos.x - pp.bord / 2) && (this.pos.x < pp.pos.x + pp.bord / 2)) {
      if ((this.pos.y > pp.pos.y - pp.bord / 2) && (this.pos.y < pp.pos.y + pp.bord / 2)) {
        var maxi = 0.3
        var stren = this.vel.mag()
        var strength = stren * stren / 5
        var force1 = this.vel.copy();
        force1.setMag(strength * 5);
        force1.mult(-1);
        this.applyForce(force1);
        // osc1.amp(env);
        // env.play();
      }
    }

  }

  this.update = function() {
    // var note1 = map(this.r, 1, 50, 0, 5);
    // var sound = map(note1, 0, 5,-12,12);
    // note1 = Math.floor(note1);

    // // var note1 = map(this.mass, 0.3, 2, 5, 0);
    // note1 = Math.floor(note1);
    // var freq1 = midiToFreq(notes[note1]+12);
    // var note2 = map(this.pos.x, 0, width, 0, 5);
    // note2 = Math.floor(note2);
    // var freq2 = midiToFreq(notes[note2]-12);
    // var pan = map(note2, 0, 5, -1,1);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.set(0, 0)
      // if (this.vel.mag()<0.3){
      //         osc1.pan(pan);
      //         osc1.amp(env)
      //         osc1.freq(freq1); 
      //         env.play();
      // }
  }
  this.display = function() {
    var n = map(noise(x), 0, 1, -0.5, 0.5)
    var m = 0.33 * (Sin(15) * 0.3 + n / 8 - 0.01);
    this.r = r;
    // this.mass += m/20
    x += 0.03
    var theta = this.vel.heading() + 0.5 * PI
    if (this.state == 0) {
      fill(random(800), random(800), random(800));
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
      fill(0, 140);
      push();
      stroke(0, 140)
      strokeWeight(2)
      translate(this.pos.x, this.pos.y);
      rotate(theta + n / 3)
      line(0, this.r * 0.4, 0, -this.r * 0.4)
      pop();
    } else {
    // var theta = this.vel.heading();
    //     push()
    //     fill(random(30,60)*this.mass,100)
    //     translate(this.pos.x,this.pos.y);
    //     rotate(theta);
    //     ellipse(0,0,this.r*this.mass/2,this.r)
    //     fill(0,180)
    //     ellipse(-this.r/(10-this.mass)+this.r/30*(sin(millis()/(1000-this.mass*50))),0,this.r/1.7)
    //     fill(200+this.mass*20,160)
    //     ellipse(-this.r/(10-this.mass),this.r/8,this.r/6)
    // fill(random(0,50),200)
    // textSize(this.r);
    // text("s",-this.r/1.6,this.r/3);
    pop()
      if (style == 1) {
        stroke(200, 100*this.mass, 125)
        fill(150, 150, 200, 30)
        if(frameCount%150>60){
          if(frameCount%150>100){
            ellipse(this.pos.x, this.pos.y, this.r-frameCount%50);

          }
          else{
            ellipse(this.pos.x, this.pos.y, this.r);
          }
        }

        fill(0, 140);
        push();
        stroke(255,255,100, 200)
        strokeWeight(2)
        translate(this.pos.x, this.pos.y);
        rotate(theta + n / 3)
        point(0,0);
        point(5,5);
        point(-5,5);
        pop();
      }
      if (style == 2) {
         push();

        translate(this.pos.x, this.pos.y);
        rotate(theta + n / 3)

        stroke(random(50,100)*this.mass,random(50,100)*this.mass,random(255)*this.mass, 80)
        this.r = r + (this.mass * n * 40)
        fill(50*this.mass, 30)
        if(frameCount%50>20){
          rectMode(CENTER);
          rect(0,0, this.r/2, this.r)
        }
        else{
          ellipse(0,0, this.r, this.r)
          
        }
        fill(0, 140);
        stroke(random(255))
        strokeWeight(1)
        // beginShape();
        // vertex(0, -this.r * 2);
        // vertex(-this.r, this.r * 2);
        // vertex(this.r, this.r * 2);
        // endShape(CLOSE);
        line(0, this.r * 0.4, 0, -this.r * 0.4)
        pop();
      }
    }
  }

}