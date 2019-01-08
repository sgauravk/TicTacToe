const getPlayersName = function() {
  document.getElementById('startGame').style.pointerEvents = "none";
  firstPlayer = document.getElementById("firstPlayer").value || "first Player";
  secondPlayer = document.getElementById("secondPlayer").value || "second Player";
  document.getElementById("gameBoard").style.display = "block";
  document.getElementById("msg").innerText = firstPlayer + "'s turn";
};

const firstPlayerSymbol = "X";
const secondPlayerSymbol = "O";
let firstPlayerInput = [];
let secondPlayerInput = [];
let allMoves = [];

const winningPattern = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const clickCell = function(cellId, playerSymbol, playerInput) {
  if (document.getElementById(cellId).innerText == "") {
    document.getElementById(cellId).innerText = playerSymbol;
    let move = +event.target.id.replace("cell_", "");
    allMoves.push(move);
    playerInput.push(move);
  } else {
    document.getElementById("msg").innerText = "Box is already allocated";
  }
};

const isEven = function(num) {
  return num % 2 == 0;
};

const isWin = function(moves) {
  return winningPattern.some(x => x.every(y => moves.includes(y)));
};

const decideTurn = function(turn) {
  let symbol = secondPlayerSymbol;
  let player = secondPlayer;
  let playerInput = secondPlayerInput;
  let secondPlayerName = firstPlayer;
  if (isEven(turn)) {
    symbol = firstPlayerSymbol;
    player = firstPlayer;
    playerInput = firstPlayerInput;
    secondPlayerName = secondPlayer;
  }
  return { symbol, player, playerInput, secondPlayerName };
};

const playGame = function(event) {
  let turn = allMoves.length;
  let { symbol, player, playerInput, secondPlayerName } = decideTurn(turn);
  document.getElementById("msg").innerText = secondPlayerName + "'s turn";
  let cellId = event.target.id;
  clickCell(cellId, symbol, playerInput);
  if (allMoves.length == 9) {
    document.getElementById("msg").innerHTML = "<h2>Match Draw</h2>";
  }
  if (isWin(playerInput)) {
    document.getElementById("msg").innerHTML = "<h2>"+player+ " won</h2>";
    document.getElementById("gameTable").onclick = null;
    document.getElementById("body").style.backgroundImage = "url('https://bit.ly/2b3zvsr')";
  }
};