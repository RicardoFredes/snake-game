class Snake {
  constructor() {
    this.reset();
    this.image = new Image();
    this.image.src = 's.png'
    this.blockMove = false;
  }
 
  update() {
    this.draw();
    this.next();
    this.blockMove = false;
  }

  reset() {
    this.x = parsePosition(COLUMNS/2);
    this.y = parsePosition(ROWS/2);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = TAIL;
    this.tail = [];
    this.score = 0;
  }

  draw() {
    this.tail[this.total] = this.head;
    for(let i = 0; i < this.total; i++) {
      const nextPosition = this.tail[i + 1];
      if (nextPosition) {
        this.tail[i] = nextPosition;
        this.drawPart(this.tail[i]);
      };
    }
  }

  drawPart(p) {
    ctx.drawImage(this.image, p.x, p.y, SCALE, SCALE);
    // draxBox('lime', p.x, p.y);
  }

  next() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x < 0) this.x = WIDTH - SCALE;
    if (this.x > WIDTH - SCALE) this.x = 0;

    if (this.y < 0) this.y = HEIGHT - SCALE;
    if (this.y > HEIGHT - SCALE) this.y = 0;
  }

  eat(fruit) {
    if (!isColliding(this, fruit)) return false;
    this.total++;
    this.score += SCORE
    score.innerText = this.score;
    return true;
  }

  get isMoving() {
    return this.xSpeed !== 0 || this.ySpeed !== 0
  }

  get head() {
    return { x: this.x, y: this.y }
  }

  collision() {
    if (!this.isMoving) return false
    for (let i = 0; i < this.tail.length - 1; i++) {
      if (!this.tail[i]) return false;
      if (isColliding(this, this.tail[i])) return true;
    }
    return false;
  }

  move(direction) {
    if (this.blockMove) return;
    switch (direction) {
      case 'Up':
        if (this.ySpeed !== 0) break;
        this.xSpeed = 0;
        this.ySpeed = -SCALE;
        this.blockMove = true;
        break;
      case 'Down':
        if (this.ySpeed !== 0) break;
        this.xSpeed = 0;
        this.ySpeed = SCALE;
        this.blockMove = true;
        break;
      case 'Left':
        if (this.xSpeed !== 0) break;
        this.xSpeed = -SCALE;
        this.ySpeed = 0;
        this.blockMove = true;
        break;
      case 'Right':
        if (this.xSpeed !== 0) break;
        this.xSpeed = SCALE;
        this.ySpeed = 0;
        this.blockMove = true;
        break;
    }
  }
}
