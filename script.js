const gameController = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const boardSize = 3;
  let turn = 1;
  let player = "X";

  function makeMove(row, col) {
    if (row >= boardSize || row < 0 || col >= boardSize || col < 0) {
      console.error("Invalid move, cell must be on 3x3 board");
      return;
    }
    if (board[row][col] !== "") {
      console.error("Invalid move, cell already taken");
      return;
    }
    board[row][col] = player;

    if (checkWinner()) {
      return player;
    }
    if (checkDraw()) {
      return "draw";
    }
    player = player === "X" ? "O" : "X";
    turn++;
    return false;
  }

  function checkWinner() {
    for (let i = 0; i < boardSize; i++) {
      // check rows
      symbol = board[i][0];
      if (symbol !== "" && board[i][1] === symbol && board[i][2] === symbol) {
        return true;
      }
      // check columns
      symbol = board[0][i];
      if (symbol !== "" && board[1][i] === symbol && board[2][i] === symbol) {
        return true;
      }
    }
    // check diag
    symbol = board[1][1];
    if (symbol !== "" && board[0][0] === symbol && board[2][2] === symbol) {
      return true;
    }
    if (symbol !== "" && board[0][2] === symbol && board[2][0] === symbol) {
      return true;
    }
    return false;
  }

  function checkDraw() {
    if (turn === 9 && !checkWinner()) {
      return true;
    }
    return false;
  }

  function getPlayer() {
    return player;
  }
  return { getPlayer, makeMove };
})();

const displayController = (function () {
  showPlayer();
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.addEventListener("click", makeMove);
  }

  function makeMove(event) {
    const cell = event.target;
    cell.textContent = gameController.getPlayer();
    let cellId = cell.id.split("");
    let result = gameController.makeMove(cellId[0], cellId[1]);
    if (result === "X" || result === "O") {
      showWinner(result);
    }
    if (result === "draw") {
      showDraw();
    }
    showPlayer();
  }

  function showPlayer() {
    const display = document.querySelector(".player-display");
    display.textContent = gameController.getPlayer();
  }

  function showWinner(winner) {
    const display = document.querySelector(".winner-display");
    display.textContent = `${winner} won`;
    disableBoard();
    return;
  }
  function showDraw() {
    const display = document.querySelector(".winner-display");
    display.textContent = `Draw`;
    disableBoard();
  }

  function disableBoard() {
    for (const cell of cells) {
      cell.removeEventListener("click", makeMove);
    }
  }
})();
