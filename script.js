const board = document.getElementById("board");
const statusText = document.getElementById("status");
let cells, currentPlayer, gameActive;

function init() {
  board.innerHTML = "";
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "X's turn";
  cells = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("click", () => makeMove(i));
    board.appendChild(div);
  }
}

function makeMove(i) {
  if (!cells[i] && gameActive) {
    cells[i] = currentPlayer;
    board.children[i].textContent = currentPlayer;
    if (checkWin()) {
      statusText.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (cells.every(cell => cell)) {
      statusText.textContent = "Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(p => p.every(i => cells[i] === currentPlayer));
}

function restart() {
  init();
}

init();
