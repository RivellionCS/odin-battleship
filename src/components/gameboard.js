import { Ship } from "./ship";

export { Gameboard };

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ shipObject: null, isHit: false }))
    );
    this.missedAttacks = [];
    this.shipsOnBoard = [];
  }

  placeShip(ship, mode, rowPosition, columnPosition) {
    if (mode === 0) {
      if (ship.length + rowPosition > this.board.length) {
        throw new Error(
          "Ship length is longer than available vertical space, please choose another position"
        );
      }
      this.shipsOnBoard.push(ship);
      for (let i = rowPosition; i < ship.length + rowPosition; i++) {
        this.board[i][columnPosition].shipObject = ship;
      }
    } else {
      if (ship.length + columnPosition > this.board.length) {
        throw new Error(
          "Ship length is longer than available horizontal space, please choose another location"
        );
      }
      this.shipsOnBoard.push(ship);
      for (let i = columnPosition; i < ship.length + columnPosition; i++) {
        this.board[rowPosition][i].shipObject = ship;
      }
    }
  }

  recieveAttack(rowPosition, columnPosition) {
    if (
      this.board[rowPosition][columnPosition].shipObject === null &&
      this.board[rowPosition][columnPosition].isHit === false
    ) {
      this.board[rowPosition][columnPosition].isHit = true;
      this.missedAttacks.push([rowPosition, columnPosition]);
      return "You have hit nothing";
    } else if (
      this.board[rowPosition][columnPosition].shipObject instanceof Ship &&
      this.board[rowPosition][columnPosition].isHit === false
    ) {
      this.board[rowPosition][columnPosition].isHit = true;
      this.board[rowPosition][columnPosition].shipObject.hit();
      return "You have hit a ship";
    } else if (this.board[rowPosition][columnPosition].isHit === true) {
      return "You have already hit that spot";
    }
  }

  allShipsSunk() {
    const shipsSunk = this.shipsOnBoard.every((item) => item.isSunk() === true);
    if (shipsSunk) {
      return "All ships have been sunk";
    }
  }
}
