import { create } from "zustand";

type State = {
  counter: number;
  start: boolean;
  increase: () => void;
  decrease: () => void;
};

const useCounterStore = create<State>((set) => ({
  counter: 0,
  start: false,
  increase: () => set((state) => ({ counter: state.counter + 1, start: true })),
  decrease: () =>
    set((state) => ({
      counter: state.counter - 1,
      start: true,
    })),
}));

const Counter2 = () => {
  const counter = useCounterStore((state) => state.counter);
  const start = useCounterStore((state) => state.start);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);

  console.log(start);

  return (
    <div className="flex flex-col">
      <span className="text-[48px]">{counter}</span>
      <div>
        <button className="text-xl" onClick={() => increase()}>
          Add
        </button>
        <button className="text-xl ml-2" onClick={() => decrease()}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter2;
