import { Ship } from "../components/ship";

const destroyer = new Ship(8);

test("Create a new ship object and check if it is a ship", () => {
  expect(destroyer).toBeInstanceOf(Ship);
});
