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

// Define the game board as a 2D array
const board = Array.from({ length: boardHeight }, () => Array(boardWidth).fill(0));
// console.log("board:", board);

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

// Define a function to draw a square on the canvas
function drawSquare(x, y) {
  // set square color to green
  ctx.font = '18px courier';
  // set font to bold
  ctx.fontWeight = 'bold';
  ctx.fillStyle = '#05fa2a';
  const squareSize = 20;
  const offsetX = (canvas.width / 2.0 - (boardWidth * squareSize / 2.0) - (squareSize / 2.0)) + squareSize;
  // use fillText to draw square, text is "[]", make sure it's right bottom corner is at x, y
  ctx.fillText('[]', x * 20 + 2 + offsetX, y * 20 + 18);
}

// Define a function to draw dot in the righ bottom of every square
function drawDot(x, y) {
  const squareSize = 20;
  const dotSize = 2;
  const offsetX = (canvas.width / 2.0 - (boardWidth * squareSize / 2.0) - (squareSize / 2.0)) + squareSize;
  const squareX = x * squareSize + offsetX;
  const squareY = y * squareSize;
  const dotX = squareX + squareSize - dotSize;
  const dotY = squareY + squareSize - dotSize;
  
  ctx.fillStyle = 'green';
  ctx.fillRect(dotX, dotY, dotSize, dotSize);
}

// Define a function to draw the game board
function drawBoard() {
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      drawDot(x, y);
      if (board[y][x]) {
        drawSquare(x, y);
      }
    }
  }
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
      for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[y].every(cell => cell)) {
          // Remove the completed line
          board.splice(y, 1);
          board.unshift(new Array(boardWidth).fill(0));
          y++;
        }
      }

      // Choose a new tetromino
      currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
      // currentTetromino = tetrominoes[1];
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
  setTimeout(gameLoop, 400);
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

//// Add event listeners to the pause button
//pauseButton.addEventListener('click', () => {
//  isPaused = !isPaused;
//  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
//});

// Add event listeners to the keyboard
document.addEventListener('keydown', event => {
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
    }
  } else if (event.code === "ArrowUp" || event.code === "KeyK") {  // Up arrow
    // Rotate the tetromino clockwise
    const rotatedTetromino = rotateTetromino(currentTetromino);
    if (canMoveTo(currentX, currentY, rotatedTetromino)) {
      currentTetromino = rotatedTetromino;
      render();
    }
  } else if (event.code === "Space") {  // Space
    // Pause or resume the game
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
  }
});

gameLoop();
