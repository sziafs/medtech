import { expect, test } from "vitest";
import { getValidDate } from "./get-valid-date";

test("should increase date with one year", () => {
  const year = new Date().getFullYear();

  expect(getValidDate(`${year}-01-01`).getFullYear()).toEqual(year + 1);
});
