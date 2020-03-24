(function() {
  // Settings
  const SCALE = 20, COLUMNS = 20, ROWS = 20, SCORE = 10, FPS = 12, TAIL_TOTAL = 5;
  const WIDTH = COLUMNS*SCALE, HEIGHT = ROWS*SCALE;

  // Initialize
  const textScore = document.getElementById('text-score');
  const textStatus = document.getElementById('text-status');
  const header = document.getElementById('header');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  header.style.width = WIDTH + 'px';
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // helpers
  function drawBox(color, x, y, w = SCALE, h = SCALE) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  function getPosition(p) {
    return Math.floor(p)*SCALE;
  }

  function hasCollision(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  // Objects
  const board = {
    status: '',
    score: 0,
    markPoint: function() {
      this.score += SCORE;
      this.update();
    },
    update: function() {
      textStatus.innerText = this.status;
      textScore.innerText = this.score;
    },
    reset: function() {
      this.status = '';
      this.score = 0;
    },
    clearStatus: function() {
      this.status = '';
      this.update();
    },
    clearScore: function() {
      this.score = 0;
      this.update();
    },
    setPause: function() {
      this.status = 'PAUSE';
      this.update();
    },
    setGameOver: function() {
      this.status = 'GAME OVER';
      this.update();
    },
  }

  const snake = {
    total: TAIL_TOTAL,
    tail: [],
    x: getPosition(COLUMNS/2),
    y: getPosition(ROWS/2),
    speedX: 0,
    speedY: 0,
    block: false,
    eat: function(fruit) {
      if(hasCollision(this, fruit)) {
        this.total++;
        return true;
      } else return false;
    },
    draw: function() {
      this.tail[this.total] = this.head();
      for (let i = 0; i < this.total; i++) {
        const newPosition = this.tail[i + 1];
        if (newPosition) {
          this.tail[i] = newPosition;
          this.drawPart(this.tail[i]);
        }
      }
    },
    dead: function() {
      if (!this.isMoving()) return false;
      for (let i = 0; i < this.tail.length - 2; i++) {
        const current = this.tail[i];
        if (!current) return false;
        if (hasCollision(this.head(), current)) return true;
      }
      return false;
    },
    head: function() {
      return { x: this.x, y: this.y };
    },
    isMoving: function() {
      return this.speedX !== 0 || this.speedY !== 0;
    },
    drawPart: function(p) {
    drawBox('lime', p.x, p.y);
    },
    update: function() {
      this.nextPosition();
      this.draw();
      this.block = false;
    },
    nextPosition: function() {
      this.x += this.speedX * SCALE;
      this.y += this.speedY * SCALE;
      if (this.x > WIDTH - SCALE) this.x = 0;
      else if (this.x < 0) this.x = WIDTH - SCALE;
      if (this.y > HEIGHT - SCALE) this.y = 0;
      else if (this.y < 0) this.y = HEIGHT - SCALE;
    },
    move: function(direction) {
      if (this.block) return;
      switch(direction) {
        case 'Up':
          if (this.speedY !== 0) break;
          this.block = true;
          this.speedX = 0;
          this.speedY = -1;
          break;
        case 'Down':
          if (this.speedY !== 0) break;
          this.block = true;
          this.speedX = 0;
          this.speedY = 1;
          break;
        case 'Left':
          if (this.speedX !== 0) break;
          this.block = true;
          this.speedX = -1;
          this.speedY = 0;
          break;
        case 'Right':
          if (this.speedX !== 0) break;
          this.block = true;
          this.speedX = 1;
          this.speedY = 0;
          break;
      }
    },
    reset: function() {
      this.total = TAIL_TOTAL;
      this.tail = [];
      this.x = getPosition(COLUMNS/2);
      this.y = getPosition(ROWS/2);
      this.speedX = 0;
      this.speedY = 0;
      this.block = false;
    },
  }

  const fruit = {
    x: 0,
    y: 0,
    update: function() {
      drawBox('red', this.x, this.y);
    },
    pickLocation: function() {
      this.x = getPosition(Math.random() * COLUMNS);
      this.y = getPosition(Math.random() * ROWS);
    },
  };

  // Controller
  function handleKeypress(e) {
    if (!game.isRunning) {
      game.start();
      board.clearStatus();
    } else if (e.keyCode === 32)  {
      board.setPause();
      return game.stop();
    }
    const direction = e.key.replace('Arrow', '');
    return snake.move(direction);
  }

  // Game
  const game = {
    run: undefined,
    isRunning: false,
    isFinish: false,
    start: function() {
      if (this.isFinish) {
        this.isFinish = false;
        board.clearScore();
      }
      this.run = setInterval(update, 1000/FPS);
      this.isRunning = true;
    },
    over: function() {
      this.stop();
      update();
      this.isFinish = true;
    },
    stop: function() {
      clearInterval(this.run);
      this.isRunning = false;
    },
    init,
  };

  function update() {
    drawBox('black', 0, 0, WIDTH, HEIGHT);
    fruit.update();
    snake.update();
    if (snake.eat(fruit)) {
      fruit.pickLocation();
      board.markPoint();
    }
    if(snake.dead()) {
      snake.reset();
      fruit.pickLocation();
      board.setGameOver();
      game.over();
    }
  }

  function init() {
    fruit.pickLocation();
    document.addEventListener('keydown', handleKeypress);
    game.start();
  }

  game.init();

}());
