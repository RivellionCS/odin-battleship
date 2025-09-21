import { Player } from "./components/player";
import { Ship } from "./components/ship";
import "./styles/main.css";

console.log("hello world");

const playerDestroyer = new Ship(5);
const computerDestroyer = new Ship(5);

const player1 = new Player("Ted", "human");
const player2 = new Player("AM", "computer");

player1.gameboard.placeShip(playerDestroyer, 0, 0, 0);
player2.gameboard.placeShip(computerDestroyer, 0, 0, 0);

function renderGameboards() {
  const playerBoard = document.getElementById("board1");
  const computerBoard = document.getElementById("board2");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const playerButton = document.createElement("button");
      const computerButton = document.createElement("button");
      playerButton.dataset.playerPosition = `${i}${j}`;
      computerButton.dataset.computerPosition = `${i}${j}`;
      playerBoard.appendChild(playerButton);
      computerBoard.appendChild(computerButton);
    }
  }
}

function renderPlayerShips() {
  const playerPositions = document.querySelectorAll("[data-player-position]");
  playerPositions.forEach((button) => {
    let rowPosition = parseInt(button.dataset.playerPosition[0]);
    let columnPosition = parseInt(button.dataset.playerPosition[1]);
    if (
      player1.gameboard.board[rowPosition][columnPosition].shipObject !== null
    ) {
      button.classList.add("ship");
    }
  });
}

function disableBoard(board) {
  const currentBoard = document.getElementById(board);
  currentBoard.style.pointerEvents = "none";
}

function switchTurnTitle(playerObject) {
  const title = document.getElementById("turn-title");
  title.textContent = `It is now ${playerObject.name}'s Turn`;
}

renderGameboards();
renderPlayerShips();
disableBoard("board1");
switchTurnTitle(player1);
