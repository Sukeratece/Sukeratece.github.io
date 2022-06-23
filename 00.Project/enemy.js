class CircleEnemy {
    constructor() {
        this.dia = 100;
        this.eX = 250;
        this.eY = 760;
        this.enemyvelocity = 5
    }

    display() {
      push();
       fill(30);
       ellipseMode(CENTER);
       imageMode(CENTER)
       image(imgenemy, this.eX, this.eY, this.dia, this.dia)
    //    ellipse(this.eX, this.eY, this.dia, this.dia);
      pop();
    }

    move1() {
        this.eY -= this.enemyvelocity
    }

    reset() {
        this.dia = 100;
        this.eX = 250;
        this.eY = 760;
    }
    delet() {
        this.eX = 800
    }
}