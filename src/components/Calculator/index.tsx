import { useState } from "react";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [value, setValue] = useState("");

  const compute = () => {
    try {
      const res = parseFloat(eval(value));

      if (res && !Number.isNaN(res)) {
        setValue(String(res));
        setDisplayValue(String(res));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const keyIn = (char: string) => {
    setValue((prev) => prev + char);
    setDisplayValue((prev) => prev + char.replace("/", "÷").replace("*", "x"));
  };

  const clear = () => {
    setDisplayValue("");
    setValue("");
  };

  return (
    <div className="flex w-[300px] flex-col">
      <input
        value={displayValue}
        className="border p-2 border-black"
        type="text"
      />
      <div className="flex w-full">
        <button onClick={() => keyIn("1")} className="flex-1 bg-slate-400">
          1
        </button>
        <button onClick={() => keyIn("2")} className="flex-1 bg-slate-400">
          2
        </button>
        <button onClick={() => keyIn("3")} className="flex-1 bg-slate-400">
          3
        </button>
        <button onClick={() => keyIn("+")} className="flex-1 bg-red-400">
          +
        </button>
      </div>
      <div className="flex w-full">
        <button onClick={() => keyIn("4")} className="flex-1 bg-slate-400">
          4
        </button>
        <button onClick={() => keyIn("5")} className="flex-1 bg-slate-400">
          5
        </button>
        <button onClick={() => keyIn("6")} className="flex-1 bg-slate-400">
          6
        </button>
        <button onClick={() => keyIn("-")} className="flex-1 bg-red-400">
          -
        </button>
      </div>
      <div className="flex w-full">
        <button onClick={() => keyIn("7")} className="flex-1 bg-slate-400">
          7
        </button>
        <button onClick={() => keyIn("8")} className="flex-1 bg-slate-400">
          8
        </button>
        <button onClick={() => keyIn("9")} className="flex-1 bg-slate-400">
          9
        </button>
        <button onClick={() => keyIn("/")} className="flex-1 bg-red-400">
          ÷
        </button>
      </div>
      <div className="flex w-full">
        <button onClick={() => keyIn("0")} className="flex-1 bg-slate-400">
          0
        </button>
        <button onClick={() => keyIn("*")} className="flex-1 bg-red-400">
          x
        </button>
        <button onClick={() => clear()} className="flex-1 bg-red-400">
          C
        </button>
        <button onClick={() => compute()} className="flex-1 bg-red-400">
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
