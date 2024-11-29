import { repeatIn, pick } from "../array";

it("repeatIn", () => {
  expect(repeatIn(["a", "b", "c"], 1)).toBe(true);
  expect(repeatIn(["a", "b", "c"], 2)).toBe(false);
  expect(repeatIn(["a", "b", "b"], 2)).toBe(true);
  expect(repeatIn(["a", "a", "a", "a", "a", "a"], 3)).toBe(true);
  expect(repeatIn(["a", "b", "c", "c", "a", "c"], 3)).toBe(true);
  expect(repeatIn(["a", "b", "c", "a", "c", "a", "a"], 4)).toBe(true);
});

it("pick", () => {
  const { arr, sub } = pick(["aa", "bb", "cc", "dd", "ee"], 2);
  expect(sub.length).toBe(2);
  expect(arr.length).toBe(3);
});
