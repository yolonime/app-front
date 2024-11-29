import { useMemo, useState } from "react";
import { formatData } from "../../utils/data";
import MoviesList from "./MoviesList";

const Movies = () => {
  const movies = useMemo(() => formatData(), []);
  const years = Object.keys(movies);
  const [categoryIndex, setCategoryIndex] = useState<number | undefined>();

  return (
    <div>
      {years.map((y, i) => {
        return (
          <MoviesList
            index={i}
            currentIndex={categoryIndex}
            key={i}
            year={y}
            onCategoryChange={(idx: number) => setCategoryIndex(idx)}
            movies={movies[y].map((m) => m.title)}
          />
        );
      })}
    </div>
  );
};

export default Movies;
