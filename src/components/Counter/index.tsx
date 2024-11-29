import { MouseEventHandler, useReducer } from "react";
import { DECREMENT, INCREMENT } from "../../store/actions";
import { reducer, State } from "../../store/reducer/counter";

const INITIAL_STATE: State = { count: 0 };

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const add: MouseEventHandler = () => {
    dispatch({ type: INCREMENT });
  };

  const substract: MouseEventHandler = () => {
    dispatch({ type: DECREMENT });
  };

  return (
    <div className="flex flex-col">
      <span className="text-[48px]">{state.count}</span>
      <div>
        <button className="text-xl" onClick={add}>
          Add
        </button>
        <button className="text-xl ml-2" onClick={substract}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
