import { useReducer } from "react";
import clsx from "clsx";

type TodoDefinition = {
  text: string;
  done: boolean;
};

type State = {
  todos: TodoDefinition[];
};

const INITIAL_STATE: State = {
  todos: [],
};

type Action = {
  type: string;
  payload: {
    idx?: number;
    text?: string;
  };
};

const DONE = "DONE";
const ADD = "ADD";
const DELETE = "DELETE";

const reducer = (state: State, action: Action) => {
  const idx = action.payload.idx ?? 0;

  if (action.type === DONE) {
    return {
      ...state,
      todos: state.todos.map((t, i) => {
        if (idx === i) {
          return { ...t, done: !t.done };
        }
        return t;
      }),
    };
  }

  if (action.type === ADD) {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          text: action.payload?.text ?? "",
          done: false,
        },
      ],
    };
  }

  if (action.type === DELETE) {
    return {
      ...state,
      todos: [...state.todos.slice(0, idx), ...state.todos.slice(idx + 1)],
    };
  }

  return state;
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleAdd = () => {
    const newTodo = window.prompt("Todo ?") ?? "";

    dispatch({ type: ADD, payload: { text: newTodo } });
  };

  return (
    <div className="flex flex-col w-[500px] mx-auto">
      <ul className="w-full">
        {state.todos.map((t, i) => {
          return (
            <div className="flex items-center">
              <li
                className={clsx(
                  { "line-through": t.done },
                  "p-2 border-[1px] cursor-pointer basis-[80%] border-black mt-2 inline-block"
                )}
                onClick={() => dispatch({ type: DONE, payload: { idx: i } })}
                key={i}
              >
                {t.text}
              </li>
              <span
                onClick={() => dispatch({ type: DELETE, payload: { idx: i } })}
                className="text-red-500 cursor-pointer inline-block ml-2"
              >
                Supprimer
              </span>
            </div>
          );
        })}
      </ul>
      <button
        className="border-[1px] border-black rounded-md mt-2"
        onClick={() => handleAdd()}
      >
        Ajouter
      </button>
    </div>
  );
};

export default Todo;
