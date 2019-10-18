class RotateObject {
  constructor(x, y, r) {
    this.id = noise(x, y) * 100;
    this.x = x;
    this.y = y;
    [this.r, this.rCircle, this._r] = [r, r, r];
    this.mode = 'normal';
    this.outSide = false;
    this.notPlayable = true;
    this.rot = false;
  }
  bigger() {
    this.r *= this.id / 20;
    this.rCircle += this.id;

  }
  update(x1, y1) {
    let distance = calcDistance(x1, y1, this.x, this.y);
    distance < this._r * 5 ? '' : distance *= 2;
    distance > this._r * 3 ? this.outSide = true : '';
    this.r = noise(frameCount / 100, this.x / 100, this.y) * this._r / 2 * 2 + 30 - distance / 20;
    this.rCircle = noise(sin(frameCount / 60), this.x / 100) * this._r * 1.5 + 10 - distance / 400;
  }
  create(x2, y2, group) {
    group.filter(obj => calcDistance(obj.x, obj.y, x2, y2) < 200);
  }
  display(color) {
    push();
    translate(this.x, this.y);

    push();
    this.notPlayable || this.rot ? rotate(this.r) : '';
    !this.notPlayable ? fill(0) : fill(255, 0, 0);
    let scal = 1;
    if (!this.outSide) {
      scal = 1.2;
    }
    rect(0, 0, this.r * scal, this.r);
    pop();

    push();
    fill(this.outSide ? [0, 40, 49, 100] : 255);
    if (color) {
      fill(color);
      ellipse(0, 0, this.rCircle, this.rCircle);
      this.notPlayable = false;
    }
    if (!this.notPlayable) {
      fill(0, this.id, this.id * 2);
      this.rCircle /= 2;
    }
    ellipse(0, 0, this.rCircle, this.rCircle);
    pop();

    pop()
  }
}