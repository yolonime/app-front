export const isPalindrome = (str: string) => {
  return str.split("").reverse().join("") === str;
};
