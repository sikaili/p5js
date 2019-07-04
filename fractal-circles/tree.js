function Tree(x,y,lens,generation,r){
  this.x = x;
  this.y = y;
  var lens = lens;
  var generation = generation;
  var r = r;
  var ran = random(200)
  var t=0;
  var array = [0,"我"]

  this.display = function(){
    translate(this.x,this.y+lens);
    Tree1(lens,generation,r);
    function Tree1(lens,generation,r){
      var angle = map(sin(((frameCount+ran)/600)*2*PI),-1,1,-0.3*PI,0.4*PI);
      // var angle = map(mouseX,0,width,-0.3*PI,0.4*PI);
      fill(255/generation,100,100,225);
      // test
      if (generation>15){
        fill(50,25,25,50+generation)
        textSize(50)

        if (state==1||touches.length>1){
          t = int(random(0,8000));
          array= split(table.getString(t,0),";")
          
        }
        array.push(array[1])
          text(array[1],generation*2,generation)
      }
      else{
        ellipse(0,-lens,r/generation);
      }
      // test
      // ellipse(0,-lens,r/generation);
      generation+=1;
      translate(0,-lens);
      lens *= 0.618;
      rotate(angle);
      if (lens > 10 && generation<18){
        push()
        // rotate(-angle/0.5);
        Tree1(lens, generation,r);
        pop()
        // test caractors
        push()
        rotate(angle/10);
        translate((cos(frameCount/600*2*PI)+3)*200,(sin(frameCount/400*2*PI)+3)*200)
        scale(generation/3)
        Tree1(lens, generation+15,r);
        pop()
      }
    }
  }
}
