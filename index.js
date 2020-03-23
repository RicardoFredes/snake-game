const SCALE = 25;
const COLUMNS = 20;
const ROWS = 15;
const VELOCITY = 12;
const TAIL = 5;

const SCORE = 10;

const WIDTH = COLUMNS * SCALE;
const HEIGHT = ROWS * SCALE;

const score = document.getElementById('score');
const status = document.getElementById('status');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const snake = new Snake();
const fruit = new Fruit();
const game = new Game();

window.onload = function() {
  document.body.firstElementChild.style.width = WIDTH;
  document.body.appendChild(canvas);
  window.addEventListener('keydown', keyboard);
  game.start();
}

function keyboard(e) {
  if (e.keyCode === 32) game.pause();

  if (!game.run && e.keyCode >= 37 && e.keyCode <= 40) game.start();

  const direction = e.key.replace('Arrow', '');
  if (direction) snake.move(direction);
}
