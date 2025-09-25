import { Player } from "./player";
import { Ship } from "./ship";

export { playGame };

function renderGameboards() {
  console.log("rendering boards");
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

function renderPlayerShips(player) {
  const playerPositions = document.querySelectorAll("[data-player-position]");
  playerPositions.forEach((button) => {
    let rowPosition = parseInt(button.dataset.playerPosition[0]);
    let columnPosition = parseInt(button.dataset.playerPosition[1]);
    if (
      player.gameboard.board[rowPosition][columnPosition].shipObject !== null
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

function attackFunctionalityPlayer(player, computer) {
  const computerSpots = document.querySelectorAll("[data-computer-position]");
  computerSpots.forEach((button) => {
    let rowPosition = parseInt(button.dataset.computerPosition[0]);
    let columnPosition = parseInt(button.dataset.computerPosition[1]);
    button.addEventListener("click", () => {
      if (
        computer.gameboard.board[rowPosition][columnPosition].shipObject !==
          null &&
        computer.gameboard.board[rowPosition][columnPosition].isHit === false
      ) {
        computer.gameboard.recieveAttack(rowPosition, columnPosition);
        button.classList.add("hit");
        button.disabled = true;
        checkWin(player, computer);
      } else if (
        computer.gameboard.board[rowPosition][columnPosition].shipObject ===
          null &&
        computer.gameboard.board[rowPosition][columnPosition].isHit === false
      ) {
        computer.gameboard.recieveAttack(rowPosition, columnPosition);
        button.textContent = "X";
        computerTurn(player, computer);
      }
    });
  });
}

function computerTurn(player, computer) {
  changeBoardStatus("board2", "disable");
  switchTurnTitle(computer);
  let rowGuess = Math.floor(Math.random() * 10);
  let columnGuess = Math.floor(Math.random() * 10);
  while (player.gameboard.board[rowGuess][columnGuess].isHit === true) {
    rowGuess = Math.floor(Math.random() * 10);
    columnGuess = Math.floor(Math.random() * 10);
  }
  const hitSpot = document.querySelector(
    `[data-player-position="${rowGuess}${columnGuess}"]`
  );
  if (
    player.gameboard.board[rowGuess][columnGuess].shipObject !== null &&
    player.gameboard.board[rowGuess][columnGuess].isHit === false
  ) {
    player.gameboard.recieveAttack(rowGuess, columnGuess);
    hitSpot.classList.add("hit");
    checkWin(computer, player);
    computerTurn(player, computer);
  } else if (
    player.gameboard.board[rowGuess][columnGuess].shipObject === null &&
    player.gameboard.board[rowGuess][columnGuess].isHit === false
  ) {
    player.gameboard.recieveAttack(rowGuess, columnGuess);
    hitSpot.textContent = "X";
    playerTurn(player);
  }
}

function playerTurn(player) {
  changeBoardStatus("board2", "enable");
  switchTurnTitle(player);
}

function switchTurnTitle(playerObject) {
  const title = document.getElementById("turn-title");
  title.textContent = `It is now ${playerObject.name}'s Turn`;
}

function checkWin(winner, loser) {
  if (loser.gameboard.allShipsSunk()) {
    changeBoardStatus("board2", "disable");
    const victoryModal = document.getElementById("victory-modal");
    const victoryTitle = document.getElementById("victory-title");
    victoryTitle.textContent = `${winner.name} has won the game!`;
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
  const playerTitle = document.getElementById("player-title");
  const computerTitle = document.getElementById("computer-title");
  nameModal.showModal();
  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.getElementById("player-name");
    const humanPlayer = new Player(playerName.value);
    nameModal.close();
    renderGameboards();
    playerTitle.textContent = `${playerName.value}'s Board`;
    computerTitle.textContent = "Computer's Board";
    placePlayerShips(humanPlayer);
  });
}

function placePlayerShips(player) {
  let shipCounter = 0;
  const shipArray = [
    new Ship(2),
    new Ship(3),
    new Ship(3),
    new Ship(4),
    new Ship(5),
  ];

  const placementModal = document.getElementById("placement-modal");
  const placementForm = document.getElementById("placement-form");
  const submitButton = placementForm.querySelector("button[type='submit']");
  const placeShipButton = document.getElementById("place-button");

  submitButton.disabled = true;

  placeShipButton.onclick = () => {
    const orientation = parseInt(
      document.querySelector("input[name='orientation']:checked").value
    );
    const rowPosition = parseInt(document.getElementById("row-position").value);
    const columnPosition = parseInt(
      document.getElementById("column-position").value
    );
    try {
      player.gameboard.placeShip(
        shipArray[shipCounter],
        orientation,
        rowPosition,
        columnPosition
      );
      shipCounter++;
      renderPlayerShips(player);
      if (shipCounter === 5) {
        submitButton.disabled = false;
        placeShipButton.disabled = true;
      }
    } catch (error) {
      alert(`There has been an error: ${error}`);
    }
  };

  placementForm.addEventListener("submit", (event) => {
    event.preventDefault();
    changeBoardStatus("board1", "disable");

    let computerPlayer;
    try {
      computerPlayer = createComputerAndPlaceShips();
    } catch (error) {
      alert("There was a problem placing computer ships. Try refreshing.");
      console.error(error);
      return;
    }
    switchTurnTitle(player);
    attackFunctionalityPlayer(player, computerPlayer);
    placementModal.close();
  });

  placementModal.showModal();
}

function createComputerAndPlaceShips() {
  const computer = new Player("Computer");
  const shipsArray = [
    new Ship(2),
    new Ship(3),
    new Ship(3),
    new Ship(4),
    new Ship(5),
  ];

  for (const ship of shipsArray) {
    let placed = false;

    while (!placed) {
      const orientation = Math.floor(Math.random() * 2); // 0 = vertical, 1 = horizontal
      const rowGuess = Math.floor(Math.random() * 10);
      const columnGuess = Math.floor(Math.random() * 10);

      if (
        canPlaceShip(
          computer.gameboard.board,
          ship.length,
          orientation,
          rowGuess,
          columnGuess
        )
      ) {
        computer.gameboard.placeShip(ship, orientation, rowGuess, columnGuess);
        placed = true;
      }
    }
  }

  return computer;
}

function canPlaceShip(board, length, orientation, row, col) {
  if (orientation === 0) {
    // vertical
    if (row + length > 10) return false;
    for (let i = 0; i < length; i++) {
      if (board[row + i][col].shipObject !== null) return false;
    }
  } else {
    // horizontal
    if (col + length > 10) return false;
    for (let i = 0; i < length; i++) {
      if (board[row][col + i].shipObject !== null) return false;
    }
  }
  return true;
}

function playGame() {
  namePlayer();
  resetGame();
}
