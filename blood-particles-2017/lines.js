function Lines(){
  var x = 0
  var y = 0
  x += (mouseX - x) * 0.05
  y += (mouseY - y) * 0.05
  line(0,y,windowWidth,y);
  lien(x,0,x,windowHeight)
  
  
  
}