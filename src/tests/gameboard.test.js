import { Gameboard } from "../components/gameboard";

const board = new Gameboard();

test("check if the created board object is of gameboard class", () => {
  expect(board).toBeInstanceOf(Gameboard);
});

const boardSize =
  board.board.every((item) => item.length === 10) && board.board.length === 10;

test("check if the created board class is an array of 10x10", () => {
  expect(boardSize).toBeTruthy();
});
