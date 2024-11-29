const getKeys = (a, acc = []) => {
  Object.keys(a).forEach((k) => {
    const value = a[k];

    acc.push(k);

    if (typeof value === "object") {
      return getKeys(a[k], acc);
    }
  });

  return [...new Set(acc)];
};

console.log(
  getKeys({
    age: 20,
    name: "Carl",
    job: {
      name: "writer",
      desc: "dfdfdff",
      hiringDate: { month: 3, year: 2024, day: 5 },
    },
  })
);
