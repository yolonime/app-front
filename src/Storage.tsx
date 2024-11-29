import { useEffect, useState } from "react";

const useSavedUser = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let val = localStorage.getItem("userName") ?? "";

    if (!val) {
      const newValue = window.prompt("Quel est votre nom ?") ?? "";
      localStorage.setItem("userName", newValue);
      val = newValue;
    }

    setUserName(val);
  }, []);

  return userName;
};

const Storage = () => {
  const userName = useSavedUser();
  return <div>Vous vous appelez {userName}</div>;
};

export default Storage;
