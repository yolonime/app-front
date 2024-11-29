import { FC, useState } from "react";

const students = [
  "Allan",
  "AmineT",
  "AmineM",
  "Christopher",
  "Elias",
  "Evoeke",
  "Ezzat",
  "Fatima",
  "Hafsa",
  "HugoZ",
  "HugoA",
  "Iliès",
  "Jassim",
  "Jérémy",
  "Jules",
  "Manan",
  "Mathieu",
  "Mathis",
  "Matteo",
  "Mohamad",
  "Mohamed",
  "MUBASHAR",
  "Timothée",
  "Uday",
];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

type Props = {
  data?: string[];
};

const Roulette: FC<Props> = ({ data = students }) => {
  const [student, setStudent] = useState("");

  const handleClick = () => {
    const rand = getRandomInt(data.length);
    setStudent(data[rand]);
  };

  return (
    <div className="w-[200px] flex flex-col justify-center items-center">
      <h1 className="text-[48px]">{student}</h1>
      <button onClick={handleClick}>Choisir</button>
    </div>
  );
};

export default Roulette;
