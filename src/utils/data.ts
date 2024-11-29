import data from "../fixtures/movies.json";

export type Movie = {
  title: string;
  year: number;
  director: string;
  rating: number;
  actors: string[];
};

export type MovieList = Record<string, Movie[]>;

export const formatData = () => {
  return data.movies.reduce<MovieList>((acc, movie) => {
    if (acc[movie.year]) {
      return { ...acc, [movie.year]: [...acc[movie.year], movie] };
    }
    return { ...acc, [movie.year]: [movie] };
  }, {});
};
