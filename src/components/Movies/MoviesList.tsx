import { FC, useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  movies: string[];
  year: string;
  index: number;
  currentIndex?: number;
  onCategoryChange: (index: number) => void;
};

const MoviesList: FC<Props> = ({
  movies,
  index,
  currentIndex,
  year,
  onCategoryChange,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!currentIndex) {
      return;
    }

    if (currentIndex !== index) {
      setOpen(false);
    }
  }, [currentIndex, index]);

  return (
    <ul className="w-[400px] m-2">
      <li
        onClick={() => {
          setOpen((prev) => !prev);
          onCategoryChange(index);
        }}
        className="flex w-full justify-between cursor-pointer"
      >
        <span>{year}</span>
        <span>{open ? "-" : "+"}</span>
      </li>
      <li
        className={clsx("transition-all duration-500 max-h-0 h-0", {
          "h-auto": open,
          "max-h-20": open,
          "overflow-hidden": !open,
        })}
      >
        <ul className="ml-2 p-2">
          {movies.map((m, i) => {
            return <li key={i}>{m}</li>;
          })}
        </ul>
      </li>
    </ul>
  );
};

export default MoviesList;
