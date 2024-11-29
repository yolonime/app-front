export const repeatIn = (arr: number[], nFactor: number) => {
  if (nFactor === 1 && arr.length > 1) {
    return true;
  }

  const letterMap = arr.reduce<Record<string, number>>((acc, next) => {
    if (!acc[next]) {
      return { ...acc, [next]: 1 };
    }
    return { ...acc, [next]: acc[next] + 1 };
  }, {});

  return Object.keys(letterMap).some((k) => {
    return letterMap[k] >= nFactor;
  });
};

export const pick = (arr: string[], size: number) => {
  const res = [] as string[];

  while (res.length < size) {
    const rand = Math.floor(Math.random() * arr.length);

    if (!res.includes(arr[rand])) {
      res.push(arr[rand]);
    }
  }

  return {
    arr: arr.reduce<string[]>((acc, next) => {
      return res.includes(next) ? acc : [...acc, next];
    }, []),
    sub: res,
  };
};
