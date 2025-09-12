export { Gameboard };

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ shipObject: null, isHit: false }))
    );
  }

  placeShip(ship, mode, rowPosition, columnPosition) {
    if (mode === 0) {
      if (ship.length + rowPosition > this.board.length) {
        throw new Error(
          "Ship length is longer than available vertical space, please choose another position"
        );
      }
      for (let i = rowPosition; i < ship.length + rowPosition; i++) {
        this.board[i][columnPosition].shipObject = ship;
      }
    } else {
      if (ship.length + columnPosition > this.board.length) {
        throw new Error(
          "Ship length is longer than available horizontal space, please choose another location"
        );
      }
      for (let i = columnPosition; i < ship.length + columnPosition; i++) {
        this.board[rowPosition][i].shipObject = ship;
      }
    }
  }
}
