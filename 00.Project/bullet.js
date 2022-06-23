class Circle {
    constructor() {
      this.c = color(255, 0, 0);
      this.x = 510
      this.y = 710;
      this.d = 10;
      this.velocity = 5;
    }
    display() {
      push();
      fill(255, 0, 0);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.d, this.d);
      pop();
    }

    move() {
      this.y += this.velocity;
    }
    reset()
    {
      this.x = -10;
      this.y = -10;
    }
    delet() {
      this.x = 900;
    }
  }
  