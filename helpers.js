function draxBox(color, x, y, w = SCALE, h = SCALE) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function isColliding(a, b) {
  return a.x === b.x && a.y === b.y;
}

function parsePosition(num) {
  return (Math.floor(num)) * SCALE;
}