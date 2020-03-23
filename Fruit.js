class Fruit {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = 'fruit.png';
  }

  update() {
    this.draw();
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, SCALE, SCALE);
    // draxBox('red', this.x, this.y);
  }

  pickLocation() {
    this.x = parsePosition(Math.random() * COLUMNS);
    this.y = parsePosition(Math.random() * ROWS);
    for (let i = 0; i < snake.tail.length; i++) {
      if (!snake.tail[i]) return;
      if (isColliding(this, snake.tail[i])) {
        return this.pickLocation();
      }
    }
  }
}