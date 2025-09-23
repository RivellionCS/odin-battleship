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

function changeBoardStatus(board, status) {
  const currentBoard = document.getElementById(board);
  if (status === "disable") {
    currentBoard.style.pointerEvents = "none";
  } else if (status === "enable") {
    currentBoard.style.pointerEvents = "auto";
  }
}

function attackFunctionalityPlayer() {
  const computerSpots = document.querySelectorAll("[data-computer-position]");
  computerSpots.forEach((button) => {
    let rowPosition = parseInt(button.dataset.computerPosition[0]);
    let columnPosition = parseInt(button.dataset.computerPosition[1]);
    button.addEventListener("click", () => {
      if (
        player2.gameboard.board[rowPosition][columnPosition].shipObject !==
          null &&
        player2.gameboard.board[rowPosition][columnPosition].isHit === false
      ) {
        player2.gameboard.recieveAttack(rowPosition, columnPosition);
        button.classList.add("hit");
      } else if (
        player2.gameboard.board[rowPosition][columnPosition].shipObject ===
          null &&
        player2.gameboard.board[rowPosition][columnPosition].isHit === false
      ) {
        player2.gameboard.recieveAttack(rowPosition, columnPosition);
        button.textContent = "X";
      }
      button.disabled = true;
      if (!checkWin(player1, player2)) {
        computerTurn();
      }
    });
  });
}

function computerTurn() {
  changeBoardStatus("board2", "disable");
  switchTurnTitle(player2);
  let rowGuess = Math.floor(Math.random() * 10);
  let columnGuess = Math.floor(Math.random() * 10);
  while (player1.gameboard.board[rowGuess][columnGuess].isHit === true) {
    rowGuess = Math.floor(Math.random() * 10);
    columnGuess = Math.floor(Math.random() * 10);
  }
  const hitSpot = document.querySelector(
    `[data-player-position="${rowGuess}${columnGuess}"]`
  );
  if (
    player1.gameboard.board[rowGuess][columnGuess].shipObject !== null &&
    player1.gameboard.board[rowGuess][columnGuess].isHit === false
  ) {
    player1.gameboard.recieveAttack(rowGuess, columnGuess);
    hitSpot.classList.add("hit");
  } else if (
    player1.gameboard.board[rowGuess][columnGuess].shipObject === null &&
    player1.gameboard.board[rowGuess][columnGuess].isHit === false
  ) {
    player1.gameboard.recieveAttack(rowGuess, columnGuess);
    hitSpot.textContent = "X";
  }
  if (!checkWin(player2, player1)) {
    playerTurn();
  }
}

function playerTurn() {
  changeBoardStatus("board2", "enable");
  switchTurnTitle(player1);
}

function switchTurnTitle(playerObject) {
  const title = document.getElementById("turn-title");
  title.textContent = `It is now ${playerObject.name}'s Turn`;
}

function checkWin(winner, looser) {
  if (looser.gameboard.allShipsSunk()) {
    changeBoardStatus("board2", "disable");
    const victoryModal = document.getElementById("victory-modal");
    const victoryTitle = document.getElementById("victory-title");
    victoryTitle.textContent = `${winner.name} has won the game!`;
    resetGame();
    victoryModal.showModal();
    return true;
  }
  return false;
}

function resetGame() {
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    location.reload();
  });
}

function namePlayer() {
  const nameModal = document.getElementById("name-modal");
  const nameForm = document.getElementById("name-form");
  nameModal.showModal();
  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.getElementById("player-name");
    const humanPlayer = new Player(playerName.textContent);
    placePlayerShips(humanPlayer);
  });
}

function placePlayerShips(player) {
  console.log(player.name);
}

renderGameboards();
renderPlayerShips();
changeBoardStatus("board1", "disable");

attackFunctionalityPlayer();
namePlayer();
