function Attractor(mass){
  this.pos = createVector(mouseX,mouseY);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = mass
  this.G = 5
  

  
  
  
  this.calculateAttraction = function(p){
    this.pos = createVector(mouseX,mouseY);
    var force = p5.Vector.sub(this.pos,p.pos);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strenth = (this.G * this.mass * p.mass) / (distance * distance);
    force.mult(strenth*5);
    return force;
  }
  
  this.display = function(){
    rect(this.pos.x,this.pos.y,150,150)
  }
  
  
  
}