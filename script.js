const gameBoard = (function () {
  let gameBoard = [
    [, ,],
    [, ,],
    [, ,],
  ];
  const place = function (symbol, row, col) {
    this.gameBoard[row][col] = symbol;
  };
  return { gameBoard, place };
})();

const player = (function () {})();

gameBoard.place("X", 0, 0);
console.log(gameBoard);
