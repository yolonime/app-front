import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Props = {};

const Get: FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      {id}
      <button onClick={handleClick}>Naviguer</button>
    </div>
  );
};

export default Get;
