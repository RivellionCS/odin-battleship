import { Ship } from "../components/ship";

const destroyer = new Ship(8);

test("Create a new ship object and check if it is a ship", () => {
  expect(destroyer).toBeInstanceOf(Ship);
});

test("Check if the hit function works so that hit increments from 0 to 1", () => {
  destroyer.hit();
  expect(destroyer.hits).toBe(1);
});

test("Check if the isSunk method works so that it returns false since hits is not equal to the length", () => {
  expect(destroyer.isSunk()).toBeFalsy();
});
