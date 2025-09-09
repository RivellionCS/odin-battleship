import { Gameboard } from "../components/gameboard";

const board = new Gameboard();

test("check if the created board object is of gameboard class", () => {
  expect(board).toBeInstanceOf(Gameboard);
});
