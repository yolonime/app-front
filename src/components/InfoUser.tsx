import { useContext } from "react";
import { userContext } from "./Context";

const InfoUser = () => {
  const user = useContext(userContext);

  return (
    <div className="flex flex-col mt-4">
      <span>Nom: {user.name}</span>
      <span>Avatar: {user.avatar ?? "aucun avatar"}</span>
    </div>
  );
};

export default InfoUser;
