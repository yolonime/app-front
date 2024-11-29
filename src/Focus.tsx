import { useEffect, useRef } from "react";

const Focus = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const a = "b";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} className="border-[1px] border-black" type="text" />
    </div>
  );
};

export default Focus;
