const ROWS = 20;
const COLS = 20;
const board = document.querySelector('#board');
const scoreEl = document.querySelector('#score');
const highScoreEl = document.querySelector('#high-score');
const overlayEl = document.querySelector('.overlay');
const gameOverEl = document.querySelector('#gameover');
const mainScoreEl = document.querySelector('#main-score');
const restartBtn = document.querySelector('#restart');

let cells = [];
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = null;
let score = 0;
let highScore = 0;
let isPaused = false;
let touchStart = null;
let engine = null;

function createBoard() {
  const total = ROWS * COLS;
  board.innerHTML = '';
  cells = [];

  for (let i = 0 ; i < total; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);
  }
}

function getIndex(x, y) {
  return y * COLS + x;
}

function getCell(x, y) {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return null;
  return cells[getIndex(x, y)];
}

function resetBoard() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  isPaused = false;
  food = null;
  overlayEl.style.display = 'none';
  updateScore();
  clearCells();
  drawSnake();
  placeFood();
}

function clearCells() {
  cells.forEach((cell) => {
    cell.classList.remove('snake', 'food');
  });
}

function drawSnake() {
  clearCells();
  snake.forEach((segment) => {
    const cell = getCell(segment.x, segment.y);
    if (cell) cell.classList.add('snake');
  });
  if (food) {
    const foodCell = getCell(food.x, food.y);
    if (foodCell) foodCell.classList.add('food');
  }
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
  highScoreEl.textContent = `High Score: ${highScore}`;
}

function randomFoodPosition() {
  const occupied = new Set(snake.map((segment) => getIndex(segment.x, segment.y)));
  const freeCells = [];

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      const index = getIndex(x, y);
      if (!occupied.has(index)) freeCells.push({ x, y });
    }
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}

function placeFood() {
  food = randomFoodPosition();
  drawSnake();
}

function updateGame() {
  if (isPaused) return;

  direction = nextDirection;
  const head = snake[0];
  const nextHead = { x: head.x + direction.x, y: head.y + direction.y };

  const collidedWithWall = nextHead.x < 0 || nextHead.x >= COLS || nextHead.y < 0 || nextHead.y >= ROWS;
  const collidedWithSelf = snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

  if (collidedWithWall || collidedWithSelf) {
    return endGame();
  }

  snake.unshift(nextHead);

  if (food && nextHead.x === food.x && nextHead.y === food.y) {
    score += 1;
    highScore = Math.max(highScore, score);
    updateScore();
    placeFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function endGame() {
  isPaused = true;
  mainScoreEl.textContent = score;
  overlayEl.style.display = 'flex';
}

function setDirection(x, y) {
  const opposite = direction.x === -x && direction.y === -y;
  if (opposite) return;
  nextDirection = { x, y };
}

function handleKey(event) {
  const key = event.key;

  if (key === ' ' || key === 'Spacebar') {
    isPaused = !isPaused;
    return;
  }

  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      setDirection(0, -1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      setDirection(0, 1);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      setDirection(-1, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      setDirection(1, 0);
      break;
    default:
      break;
  }
}

function handleTouchStart(event) {
  const touch = event.touches[0];
  touchStart = { x: touch.clientX, y: touch.clientY };
}

function handleTouchEnd(event) {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  const threshold = 30;

  if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
    touchStart = null;
    return;
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    setDirection(dx > 0 ? 1 : -1, 0);
  } else {
    setDirection(0, dy > 0 ? 1 : -1);
  }

  touchStart = null;
}

function init() {
  createBoard();
  resetBoard();
  window.addEventListener('keydown', handleKey);
  board.addEventListener('touchstart', handleTouchStart, { passive: true });
  board.addEventListener('touchend', handleTouchEnd);
  restartBtn.addEventListener('click', resetBoard);

  engine = setInterval(updateGame, 150);
}

init();