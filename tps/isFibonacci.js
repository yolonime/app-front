const isFibonacci = (arr) => {
  if (!Array.isArray(arr) || arr.length <= 1) {
    return false;
  }
  let first = arr[0];
  let sec = arr[1];
  let res = true;

  for (let i = 2; i < arr.length; i++) {
    const val = arr[i];
    if (first + sec !== val) {
      res = false;
      break;
    }
    first = sec;
    sec = val;
  }

  return res;
};

console.log(isFibonacci([1, 2, 3, 5, 8, 13, 21]));
