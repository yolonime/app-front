import { FC } from "react";

type Props = {
  onChange: () => void;
};

const Input: FC<Props> = ({ onChange }) => {
  return <input type="text" placeholder="saisie" onChange={onChange} />;
};

export default Input;
