function Sound(m,p){
  // this.e = floor(map(p.pos.y,0,height,0,5));
  // var freq = midiToFreq(notes[floor(map(p.pos.y,0,height,0,5))]);
  // m.freq(freq);
  // print(p.ind)
  if (p.ind>0.5){
    m.setType('sawtooth');
    // m.setType('sine');
  }
  else {
    m.setType('sine');
  }
  m.pan(map(p.pos.x,0,width,-1,1));
  m.note = map(p.pos.y, 0, height, 0, 10);
  m.note = Math.floor(m.note);
  // print(m.note);
  m.freq1 = midiToFreq(notes[m.note]);
  m.freq(m.freq1+p.ind*1000);
  m.freq(m.freq1);
  // m.freq(height/1.1-p.pos.y);
  m.amp(p.mass/10);
  // m.start();
  delay.process(m,0.99,0.5,p.pos.x)
  //   this.osc.setType('sine');
}