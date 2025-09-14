import { Gameboard } from "../components/gameboard";
import { Ship } from "../components/ship";

let board;

beforeEach(() => {
  board = new Gameboard();
});

const submarine = new Ship(2);

test("check if the created board object is of gameboard class", () => {
  expect(board).toBeInstanceOf(Gameboard);
});

test("check if the created board class is an array of 10x10", () => {
  const boardSize =
    board.board.every((item) => item.length === 10) &&
    board.board.length === 10;
  expect(boardSize).toBeTruthy();
});

test("check if the ship can be placed vertically in the gameboard", () => {
  board.placeShip(submarine, 0, 0, 0);
  expect(board.board[0][0].shipObject).toBe(submarine);
  expect(board.board[1][0].shipObject).toBe(submarine);
});

test("check if the ship can be placed horizontally in the gameboard", () => {
  board.placeShip(submarine, 1, 0, 0);
  expect(board.board[0][0].shipObject).toBe(submarine);
  expect(board.board[0][1].shipObject).toBe(submarine);
});

test("check if you can't place a ship at a spot where it's length is longer than the available space vertically", () => {
  expect(() => board.placeShip(submarine, 0, 9, 0)).toThrow(
    "Ship length is longer than available vertical space, please choose another position"
  );
});

test("check if you can't place a ship at a spot where it's length is longer than the available space horizontally", () => {
  expect(() => board.placeShip(submarine, 1, 0, 9)).toThrow(
    "Ship length is longer than available horizontal space, please choose another location"
  );
});

test("check if recieveAttack function works when hitting a ship", () => {
  board.placeShip(submarine, 0, 0, 0);
  expect(board.recieveAttack(0, 0)).toBe("You have hit a ship");
});

test("check if recieveAttack function works when hitting nothing", () => {
  board.placeShip(submarine, 0, 0, 0);
  expect(board.recieveAttack(2, 2)).toBe("You have hit nothing");
});

test("check if recieveAttack function works when hitting an already hit spot", () => {
  board.placeShip(submarine, 0, 0, 0);
  board.recieveAttack(2, 2);
  expect(board.recieveAttack(2, 2)).toBe("You have already hit that spot");
});
