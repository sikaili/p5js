function Attractor(x, y, m) {
  this.pos = createVector(x, y);
  this.mass = m;
  this.del = true;
  this.G = 1
  this.maxForce = 28
  this.bord = m * 2.828*1.2
  this.calForce = function(p) {
    this.vDiff = p5.Vector.sub(this.pos, p.pos);
    var distance = this.vDiff.mag();
    distance = constrain(distance, 5, 25);
    var strength = this.G * this.mass * p.mass / (distance * distance);
    var force = this.vDiff.setMag(strength);
    force.limit(this.maxForce);
    return force;
  }
  
  this.border = function(){
      if ((mouseX > this.pos.x-this.bord/10) && (mouseX<this.pos.x+this.bord/10)){
        if((mouseY > this.pos.y-this.bord/10) && (mouseY<this.pos.y+this.bord/10)){
          var del = 1
          this.del = true;
          return del
        }
      }
      
    
  }
  this.border = function(){
    if ((mouseX > this.pos.x-this.bord/2) && (mouseX<this.pos.x+this.bord/2)){
      if((mouseY > this.pos.y-this.bord/2) && (mouseY<this.pos.y+this.bord/2)){
        var del = 1
        this.del = true;
        return del
      }
    }

    
    
  }
  this.display = function(col) {
    push()
    noStroke();
    if(col){
      fill(col);
    }
    else{
      //lv
      // fill(random(29),constrain(this.mass,30,120),random(100), 120/this.mass+random(1,2))
      //hong
      if(random(0,1)>0.89){
        fill(255,50);
      }
      if(random(0,1)>0.95){
        fill(0,80);
      }
      else{
        if(this.del==true){
          fill(100,random(20));
        }
        else{
          fill(0,180,35,25)
        }
      
    // fill(255)
      }
    }
    noStroke()
    // rect(this.pos.x+-0.5*bord, this.pos.y+-0.5*bord, this.bord, height)
    ellipse(this.pos.x,this.pos.y,this.bord*(1-Math.random()));
    pop()
    
    
  }
}