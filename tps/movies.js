const movies = require("../movies.json").movies;

// movies with rating > 9
// console.log(
//   movies.filter((m) => {
//     return m.rating > 9;
//   })
// );

//all actors
// const actors = [...new Set(movies.flatMap((m) => m.actors))];
// console.log(actors.length);

//movies by years
console.log(
  movies.reduce((acc, next) => {
    return {
      ...acc,
      [next.year]: acc[next.year] ? [...acc[next.year], next] : [next],
    };
  }, {})
);

// movies with Brad Pitt
//console.log(movies.filter((m) => m.actors.includes("Brad Pitt")));

// actors map (played movies count)

// const map = movies.reduce((acc, next) => {
//   next.actors.forEach((act) => {
//     if (acc[act]) {
//       acc[act] += 1;
//     } else {
//       acc[act] = 1;
//     }
//   });
//   return acc;
// }, {});

// const max = Math.max(...Object.values(map));
// console.log(max, "MAX");
// const actorWithMaxMovies = Object.entries(map).find(([k, v]) => v === max);
// console.log(actorWithMaxMovies);
