class RotateObject {
  constructor(x, y, r) {
    this.id = noise(x, y) * 100;
    this.x = x;
    this.y = y;
    [this.r, this.rCircle, this._r] = [r, r, r];
    this.mode = 'normal';
    this.playble = false;
    this.rot = false;
  }
  bigger() {
    this.r *= this.id / 20;
    this.rCircle += this.id;

  }
  update(x1, y1) {
    let distance = calcDistance(x1, y1, this.x, this.y);
    if (distance < this._r * 4) {
      this.mode = 'inside'
    } else {
      this.mode = 'outside'
      distance *= 2.2
    };
    this.r = noise(frameCount / 100, this.x / 100, this.y) * this._r / 2 * 2 + 30 - distance / this._r * 2;
    this.rCircle = noise(sin(frameCount / 60), this.x / 100) * this._r * 1.5 + 10 - distance / 400;
    this.r = noise(frameCount / 100, calcDistance(mouseX, mouseY, this.x, this.y) / 150 + frameCount / 40) * this._r / 2 * 2 + 30 - distance / 20;
    this.rCircle = noise(sin(frameCount / 60), calcDistance(mouseX, mouseY, this.x, this.y) / 300 + frameCount / 100) * this._r * 1.5 + 10 - distance / 400;
  }
  create(x2, y2, group) {
    group.filter(obj => calcDistance(obj.x, obj.y, x2, y2) < 200);
  }
  display(color) {
    push();
    translate(this.x, this.y);

    push();
    !this.playble || this.rot ? rotate(this.r) : '';
    this.playble ? fill(0) : fill(255, 0, 0);
    let scal = 1;

    rect(0, 0, this.r * scal, this.r);
    fill(0, 0, 200, 80);
    beginShape();
    switch (this.mode) {
      case 'inside': {
        vertex(0, -this.r / 2);
        vertex(this.r / 2, this.r / 2);
        vertex(-this.r / 2, this.r / 2);
        break;
      }
    }
    endShape(CLOSE);
    pop();

    push();
    fill([0, 40, 49, 100]);
    if (color) {
      fill(color);
      ellipse(0, 0, this.rCircle, this.rCircle);
      this.playble = true;
    }
    if (this.playble) {
      fill(0, this.id, this.id * 2);
      this.rCircle /= 2;
    }
    ellipse(0, 0, this.rCircle, this.rCircle);
    pop();

    pop()
  }
}