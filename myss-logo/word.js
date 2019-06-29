function Word(_speed,_size,_height,_word,_x){
  this.speed = _speed;
  this.size = _size;
  if(height>width){
    this.size*=1.5;
  }
  this.height = _height;
  this.word = companys[Math.floor(_word)];
  this.x = _x;
  this.rand = Math.random();
  this.update = function (){
    this.bounds = font.textBounds(this.word,this.x,this.height,this.size);
    if ( mouseX >= this.bounds.x && mouseX <= this.bounds.x + this.bounds.w &&
      mouseY >= this.bounds.y && mouseY <= this.bounds.y + this.bounds.h) {
        if(this.rand>0.5){
          random(0,255);
          line(this.bounds.x,this.bounds.y,this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h);
          line(this.bounds.x+this.bounds.w,this.bounds.y,this.bounds.x,this.bounds.y+this.bounds.h);
        }
        osc1.freq(110*floor(random(5)));
        osc1.amp(0.05,0.05);
        osc1.freq(0,0.1);
        this.x += random(-10, 5);
        this.size*=0.9;
        this.height += random(-5, 10);
        this.speed*=-1;
        background(0,20);
    }
  }

  this.display = function(){
    if(this.x>width){
      fill(255,0,0);
      if(this.speed>5&&this.x>width){
        background(0);
        osc.freq(110*floor(this.speed));
        osc.amp(0.05,0.05);
        osc.freq(0,0.1);
        this.x =random(0,width/2);
        // this.rand = 0.1;
        this.height = random(height);
        this.size*=2;
      }
      else{
        this.x = 0;
      }
      if(this.size>100){
        this.speed = random(-3,3);
        this.size = random(10,20);
      }
    }
    if(this.height>height){
      this.height = -500;
    }
    fill(0,150);
    textSize(this.size);
    push();
    if(state==1){
      translate(random(-3,3),0);
    }
    if(this.rand<0.5){
      this.height+=this.speed;
      translate(this.x,this.height);
      rotate(PI/2);
      fill(0,180);
      text(this.word,0,0);

    }
    else{
      this.x+=this.speed;
      translate(this.x,this.height);
      fill(0,180);
      // rect(0,0-this.bounds.h,this.bounds.w,this.bounds.h);
      // fill(255);

      text(this.word,0,0);
    }
    pop();
  }


}