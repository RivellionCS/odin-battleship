export { Gameboard };

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ shipObject: null, isHit: false }))
    );
  }
}
