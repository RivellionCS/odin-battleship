import { Player } from "../components/player";

test("Expect a new player to be of Player class", () => {
  const testPlayer = new Player("John");
  expect(testPlayer).toBeInstanceOf(Player);
});
