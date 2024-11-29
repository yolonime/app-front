import { FC } from "react";

type Props = {
  first: boolean;
  last: boolean;
  value: string;
  show?: boolean;
};

const Letter: FC<Props> = ({ value, first, last, show = false }) => {
  const shouldShow = show || first || last;

  return <span className="text-[48px]">{shouldShow ? value : "-"}</span>;
};

export default Letter;
