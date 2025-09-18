import { Player } from "../components/player";
import { Gameboard } from "../components/gameboard";

test("Expect a new player to be of Player class", () => {
  const testPlayer = new Player("John");
  expect(testPlayer).toBeInstanceOf(Player);
});

test("Expect the player class to store the player name", () => {
  const testPlayer = new Player("Mario");
  expect(testPlayer.name).toBe("Mario");
});

test("Expect a human player to be human and a computer player to be computer", () => {
  const testHuman = new Player("Ted", "human");
  const testComputer = new Player("AM", "computer");
  expect(testHuman.type).toBe("human");
  expect(testComputer.type).toBe("computer");
});

test("Expect a player to have their own gameboard", () => {
  const testPlayer = new Player("Luigi", "human");
  expect(testPlayer.gameboard).toBeInstanceOf(Gameboard);
});
