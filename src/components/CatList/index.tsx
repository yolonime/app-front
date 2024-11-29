import { FC, useEffect, useState } from "react";
import { get } from "../../utils/api";

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const CatList: FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );

        setCats(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cat-list">
      <span>Some Random Cats</span>
      {cats.map((cat) => {
        return (
          <div key={cat.id}>
            <img width="200" src={cat.url} height="200" alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default CatList;
