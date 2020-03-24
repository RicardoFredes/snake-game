class Game {
  constructor() {
    this.run = undefined;
    fruit.pickLocation(snake);
  }

  start() {
    score.innerText = snake.score;
    status.innerText = '';
    this.run = setInterval(this.update, 1000/VELOCITY);
  }

  pause() {
    if (!snake.isMoving) return;
    if (!this.run) this.start();
    else {
      status.innerText = 'PAUSE';
      this.stop()
    };
  }

  stop() {
    clearInterval(this.run);
    this.run = undefined;
  }

  over() {
    snake.reset();
    this.stop();
    status.innerText = 'GAME OVER';
    fruit.pickLocation();
    this.update();
  }

  update = () => {
    draxBox('black', 0, 0, WIDTH, HEIGHT);
    snake.update();
    fruit.update();
    if (snake.eat(fruit)) fruit.pickLocation();
    if (snake.collision()) this.over();
  }

}