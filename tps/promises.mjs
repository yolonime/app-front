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

let userIDs = [1, 2, 3];

const fetchUser = (id, res = []) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([...res, { id }]);
    }, 1000);
  });

// console.time("track");
// await Promise.all([wait2sc(), wait5sc()]);
// console.timeEnd("track");

const res = await userIDs.reduce(async (previousPromise, nextID) => {
  const res = await previousPromise;
  return fetchUser(nextID, res);
}, Promise.resolve());

console.log(res);
