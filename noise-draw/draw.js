function Draw(d,_m){
  this.d = d;
  this.mp = [];
  this.rec = false;
  this.yoff= 0;
  this.theta = 0;
  this.mouseI = 0;
  this.m = _m;
  this.count = 0;
  this.mouse = function(inB) {
    if(this.m){
      if((abs(mouseX-pmouseX)>0||abs(mouseY-pmouseY)>0)){
        for(let i =0;i<this.m.length;i++){
          this.mp.push(this.m[i]);
        }
        this.m = [];
      }
    }
    else{
      if (this.rec&&!inB&&!(mouseX<width/10&&mouseY<width/10)&&!(mouseX>width*0.9&&mouseY>height-width*0.1)){
        var ee = createVector(mouseX, mouseY);
        if((abs(mouseX-pmouseX)>0||abs(mouseY-pmouseY)>0)&& !keyIsPressed){
          this.mp.push(ee);
        }
        if(touches.length>1||(keyIsPressed&&mouseIsPressed)){
          this.mp.splice(this.mp.length-1,1);
        }
      }

    }
  }
  this.display = function(_xoff){
    push();
    fill(0,50+constrain((mouseX-pmouseX),-20,100)+amplitude*10);
    strokeWeight((0.8)*(width+height)/1500+Math.random()/3);
    beginShape();
    for (var ee = 0; ee < this.mp.length; ee++) {
        this.mouseI = constrain(map(abs(mouseX-width/2),0,width/2,1,2),1.2,2);
        this.offsett = map(noise(this.yoff*_xoff),0,1,-20*this.mouseI,20*this.mouseI)/3/2000*(width+height);
        vertex(this.mp[ee].x+this.offsett*sin(this.theta), this.mp[ee].y+this.offsett*cos(this.theta)*(constrain((mouseY-pmouseY)/2,0.5,800)));
        this.yoff+=0.5*(map(mouseY,0,height,-0.1,0.1));
        this.theta+=0.01;
    }
    endShape();
    pop();
  }

}