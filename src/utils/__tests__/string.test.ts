import { isPalindrome } from "../string";

describe("String utils", () => {
  it("should return false if no palidrome given", () => {
    expect(isPalindrome("azerty")).toBe(false);
    expect(isPalindrome("cabane")).toBe(false);
    expect(isPalindrome("test")).toBe(false);
  });

  it("should return true if no palidrome given", () => {
    expect(isPalindrome("kayak")).toBe(true);
    expect(isPalindrome("radar")).toBe(true);
    expect(isPalindrome("racecar")).toBe(true);
  });
});
