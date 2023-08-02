// Define the game board size
const boardWidth = 10;
const boardHeight = 20;

// Define the tetromino shapes
const tetrominoes = [
  [[1, 1], [1, 1]],  // Square
  [[1, 1, 1, 1]],  // Line
  [[0, 1, 1], [1, 1, 0]],  // Z
  [[1, 1, 0], [0, 1, 1]],  // S
  [[1, 0, 0], [1, 1, 1]],  // L
  [[0, 0, 1], [1, 1, 1]],  // J
  [[1, 1, 1], [0, 1, 0]]  // T
];

// Define a function to get the next piece
function getNextTetromino() {
  const tetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return tetromino;
}

// Define the game board as a 2D array
const board = Array.from({ length: boardHeight }, () => Array(boardWidth).fill(0));
// console.log("board:", board);

let nextTetromino = getNextTetromino();

// Define the current tetromino and its position
let currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
let currentX = boardWidth / 2 - currentTetromino[0].length / 2;
if (currentTetromino[0].length % 2 === 1) {
  currentX = boardWidth / 2 - (currentTetromino[0].length + 1) / 2;
}
let currentY = 0;

// Get the canvas element and context
const canvas = document.getElementById('canvas');
// set canvas background color to black
canvas.style.backgroundColor = 'black';
const ctx = canvas.getContext('2d');
//const pauseButton = document.getElementById('pauseButton');

let isPaused = false;
let isGameOver = false;
let lines = 0;
let level = 1;
let score = 0;
let speed = 800;

const levelSpeeds = [800, 600, 400, 300, 200, 100, 50];

// Define a function to calculate the level based on the score
function calculateLevel(score) {
  return Math.floor(Math.log(score / 500 + 1) / Math.log(2) + 1);
}

// Define a function to update the speed based on the level
function updateSpeed() {
  level = calculateLevel(score);
  speed = levelSpeeds[level - 1];
}

const fontGame = 18 + 'px Courier';
const fontGameBorder = 18 + 'px Victor Mono';
const fontGameInfo = 18 + 'px Victor Mono';
const squareSize = 24;
const dotSize = 2;
const offsetX = (canvas.width / 2.0) - (boardWidth / 2.0 * squareSize) - squareSize / 2.0;
const offsetY = squareSize * 2;

// Define a function to draw a square on the canvas
function drawSquare(x, y, color='#05fa2a') {
  const squareX = x * (squareSize - 5) + offsetX + 6;
  const squareY = y * squareSize + offsetY - 3;
  ctx.font = fontGame;
  ctx.fontWeight = 'bold';
  // set square color to green
  ctx.fillStyle = color;
  // use fillText to draw square, text is "[]", make sure it's right bottom corner is at x, y
  ctx.fillText('[]', squareX, squareY);
}

// Define a function to draw dot in the righ bottom of every square
function drawDot(x, y) {
  const squareX = x * (squareSize - 5) + offsetX;
  const squareY = y * squareSize + squareSize;
  const dotX = squareX + squareSize - dotSize;
  const dotY = squareY + squareSize - dotSize;
  
  ctx.fillStyle = '#05fa2a';
  ctx.fillRect(dotX, dotY, dotSize, dotSize);
}

// Define a function to draw the border
function drawBorder() {
  const leftBorderX = offsetX - squareSize/2 - 5;
  const rightBorderX = leftBorderX + boardWidth * squareSize - squareSize;
  const bottomBorderY = offsetY + boardHeight * squareSize;
  const borderY = 0;

  ctx.font = fontGameBorder;
  ctx.fillStyle = 'green';

  // Left border
  for (let i = 0; i < boardHeight; i++) {
    ctx.fillText('<!', leftBorderX, borderY + i * squareSize + offsetY);
  }
  // Right border
  for (let i = 0; i < boardHeight; i++) {
    ctx.fillText('!>', rightBorderX, borderY + i * squareSize + offsetY);
  }
  // Bottom border
  for (let i = 0; i < boardWidth; i++) {
    if (i === 0) {
      ctx.fillText('<!', leftBorderX + i * squareSize, bottomBorderY);
    }
    if (i === boardWidth - 1) {
      ctx.fillText('!>', rightBorderX, bottomBorderY);
    }
  }
  // Outer bottom border
  for (let i = 0; i < boardWidth * 2 - 2; i++) {
    if (i !== 0 && i !== 1) {
      ctx.fillText('=', leftBorderX + i/2 * squareSize, bottomBorderY);
      if (i % 2 === 1) {
        ctx.fillText('/', leftBorderX + i/2 * squareSize, bottomBorderY + squareSize);
      } else {
        ctx.fillText('\\', leftBorderX + i/2 * squareSize, bottomBorderY + squareSize);
      }
    }
  }
}

// Define a function to pad string with spaces
function padString(left, right, length) {
  if (left.length + right.length >= length) {
    return left + right; // If the string is already longer or equal to the desired length, return the original string.
  }
  const numberOfSpacesToAdd = length - left.length - right.length;
  const spaces = " ".repeat(numberOfSpacesToAdd);
  const extendedStr= left + spaces + right;

  return extendedStr;
}

// Define a function to draw the score
function drawGameInfo() {
  ctx.font = fontGameInfo;
  // set square color to green
  ctx.fillStyle = '#05fa2a';
  const offsetX = 0;
  const offsetY = squareSize * 2;

  ctx.fillText(padString('ПОЛНЫХ СТРОК: ', lines.toString(), 20), offsetX, offsetY);
  ctx.fillText(padString('УРОВЕНЬ: ', level.toString(), 20), offsetX, offsetY + squareSize);
  ctx.fillText('H: НАЛЕВО   L: НАПРАВО', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize);
  ctx.fillText('     K: ПОВОРОТ', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize * 2);
  ctx.fillText(padString('  СЧЕТ: ', score.toString(), 12), offsetX, offsetY + squareSize * 2);
  ctx.fillStyle = 'green';
  ctx.fillText('4:УСКОРИТЬ  5:СБРОСИТЬ', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize * 3);
  ctx.fillText('1: ПОКАЗАТЬ СЛЕДУЮЩУЮ', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize * 4);
  ctx.fillText('0:  СТЕРЕТЬ ЭТОТ ТЕКСТ', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize * 5);
  ctx.fillText('  ПРОБЕЛ - СБРОСИТЬ', (canvas.width / 1.5) - squareSize / 2, offsetY + squareSize * 6);
}

function drawNextTetromino(nextTetromino) {
  const nextTetrominoHeight = nextTetromino.length;
  const nextTetrominoWidth = nextTetromino[0].length;
  const offsetX = squareSize * 4;
  const offsetY = squareSize * 12;

  for (let y = 0; y < nextTetrominoHeight; y++) {
    for (let x = 0; x < nextTetrominoWidth; x++) {
      if (nextTetromino[y][x]) {
        let squareX = x * squareSize + offsetX;
        let squareY = y * squareSize + offsetY;
        ctx.font = fontGame;
        ctx.fontWeight = 'bold';
        // set square color to green
        ctx.fillStyle = '#05fa2a';
        // use fillText to draw square, text is "[]", make sure it's right bottom corner is at x, y
        ctx.fillText('[]', squareX, squareY);
      }
    }
  }
}

// Define a function to draw the game board
function drawBoard(squareColor='#05fa2a') {
  drawBorder();
  drawGameInfo();
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      drawDot(x, y);
      if (board[y][x]) {
        drawSquare(x, y, squareColor);
      }
    }
  }
  drawNextTetromino(nextTetromino);
}

// Define a function to rotate the tetromino clockwise by 90 degrees
function rotateTetromino(tetromino) {
  const rotatedTetromino = [];
  for (let x = 0; x < tetromino[0].length; x++) {
    const newRow = [];
    for (let y = tetromino.length - 1; y >= 0; y--) {
      newRow.push(tetromino[y][x]);
    }
    rotatedTetromino.push(newRow);
  }
  return rotatedTetromino;
}

// Define a function to check if a tetromino can be moved to a given position
function canMoveTo(x, y, tetromino) {
  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (tetromino[row][col]) {
        const newX = x + col;
        const newY = y + row;
        if (newX < 0 || newX >= boardWidth || newY >= boardHeight || board[newY][newX]) {
          return false;
        }
      }
    }
  }
  return true;
}

// Define the game loop
function gameLoop() {
  if (!isPaused) {
    // Move the tetromino down
    currentY++;
    
    // Check if the tetromino has collided with the bottom or another tetromino
    if (currentY + currentTetromino.length > boardHeight || currentTetromino.some((row, y) => row.some((cell, x) => cell && board[currentY + y][currentX + x]))) {
      // Move the tetromino back up
      currentY--;
      
      // Add the tetromino to the board
      currentTetromino.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            board[currentY + y][currentX + x] = 1;
          }
        });
      });
      
      // Remove the completed lines from the game board
      let rowsCleared = 0;
      for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[y].every(cell => cell)) {
          // Remove the completed line
          board.splice(y, 1);
          board.unshift(new Array(boardWidth).fill(0));
          rowsCleared++;
          lines++;
          y++;
        }
      }
      if (rowsCleared > 0) {
        if (rowsCleared === 1) {
          score += 40 * (level + 1);
        }
        if (rowsCleared === 2) {
          score += 100 * (level + 1);
        }
        if (rowsCleared === 3) {
          score += 300 * (level + 1);
        }
        if (rowsCleared === 4) {
          score += 1200 * (level + 1);
        }
      }
      updateSpeed();

      // Choose a new tetromino
      currentTetromino = nextTetromino;
      nextTetromino = getNextTetromino();
      currentX = boardWidth / 2 - currentTetromino[0].length / 2;
      if (currentTetromino[0].length % 2 === 1) {
        currentX = boardWidth / 2 - (currentTetromino[0].length + 1) / 2;
      }
      currentY = 0;
    }

    // Check if the game is over
    if (board[0].some(cell => cell)) {
      // End the game
      console.log('Game over!');
      isGameOver = true;
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoard(squareColor='green');
      return;
    }
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the game board
    // console.log("board:", board);
    drawBoard();
    
    // Draw the current tetromino
    currentTetromino.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          drawSquare(currentX + x, currentY + y);
        }
      });
    });
  }

  // Wait for the next frame
  // requestAnimationFrame(gameLoop);
  setTimeout(gameLoop, speed);
}

function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  // Draw the game board
  // console.log("board:", board);
  drawBoard();
  
  // Draw the current tetromino
  currentTetromino.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        drawSquare(currentX + x, currentY + y);
      }
    });
  });
}

// Add event listeners to the pause button
//pauseButton.addEventListener('click', () => {
//  isPaused = !isPaused;
//  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
//});

// Add event listeners to the keyboard
document.addEventListener('keydown', event => {
  if (!isPaused && !isGameOver) {
    if (event.code === "ArrowLeft" || event.code === "KeyH") {  // Left arrow
      // Move the tetromino left
      if (currentX > 0) {
        currentX--;
        render();
        // Check if the tetromino has collided with another tetromino
        if (currentTetromino.some((row, y) => row.some((cell, x) => cell && board[currentY + y][currentX + x]))) {
          // Move the tetromino back
          currentX++;
          render();
        }
      }
    } else if (event.code === "ArrowRight" || event.code === "KeyL") {  // Right arrow
      // Move the tetromino right
      if (currentX + currentTetromino[0].length < 10) {
        currentX++;
        render();
        // Check if the tetromino has collided with another tetromino
        if (currentTetromino.some((row, y) => row.some((cell, x) => cell && board[currentY + y][currentX + x]))) {
          // Move the tetromino back
          currentX--;
          render();
        }
      }
    } else if (event.code === "ArrowDown" || event.code === "KeyJ") {  // Down arrow
      // Move the tetromino down
      currentY++;
      render();
      // Check if the tetromino has collided with the bottom or another tetromino
      if (currentY + currentTetromino.length > boardHeight || currentTetromino.some((row, y) => row.some((cell, x) => cell && board[currentY + y][currentX + x]))) {
        // Move the tetromino back up
        currentY--;
        render();
      } else {
        score++;
      }
    } else if (event.code === "ArrowUp" || event.code === "KeyK") {  // Up arrow
      // Rotate the tetromino clockwise
      const rotatedTetromino = rotateTetromino(currentTetromino);
      if (canMoveTo(currentX, currentY, rotatedTetromino)) {
        currentTetromino = rotatedTetromino;
        render();
      }
    }
  }
  if (event.code === "Space") {  // Space
    // Pause or resume the game
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
  }
});

gameLoop();
