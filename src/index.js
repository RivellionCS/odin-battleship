import "./styles/main.css";

console.log("hello world");

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

renderGameboards();
