const wait2sc = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const wait5sc = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

console.time("track");

await wait2sc();
await wait5sc();

console.timeEnd("track");
