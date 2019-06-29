function Particle(x,y,mass){
  this.pos = createVector(x,y);
  this.vel = createVector(3,3);
  this.acc = createVector(0,0);
  this.mass = mass
  
  
  
  this.applyForce = function(force){
    this.acc = force.div(this.mass);
  }
  
  
  
  
  
  this.update = function(){
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
    this.acc.set(0,0)
  }
  
  this.bord = function(){
    if (((this.pos.x>=mouseX) && (this.pos.x<=mouseX+150))){
      if (this.pos.y > mouseY +150 && this.pos.y< mouseY + 150 + 25){
        this.vel.y *= -1
      }
      else if (this.pos.y < mouseY && this.pos.y> mouseY -25){
        this.vel.y *= -1
      }
    this.vel.mult(0.999)
    }
    else if (this.pos.y>= mouseY && this.pos.y <= mouseY + 150) {
      if (this.pos.x > mouseX-25 && this.pos.x< mouseX + 150){
        this.vel.x *= -1
      }
      else if (this.pos.x > mouseX && this.pos.x< mouseX + 150 + 25){
        this.vel.x *= -1
      }
    this.vel.mult(0.999)

    }
  }
  
  this.display = function(){
    this.vel.mag
    ellipse(this.pos.x,this.pos.y,30*this.mass-this.vel.x,30*this.mass-this.vel.x)
  }
  
  
  
  
}