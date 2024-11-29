import { useEffect, useReducer, useRef } from "react";
import Letter from "./Letter";

enum Status {
  RUNNING = "running",
  INIT = "INIT",
  WIN = "WIN",
  LOSE = "LOSE",
}

type State = {
  round: number;
  status: Status;
  answers: string[];
  maxRound: number;
  word: string;
};

const INITIAL_STATE: State = {
  word: "javascript",
  status: Status.INIT,
  answers: [],
  round: 1,
  maxRound: 10,
};

type Action = {
  type: string;
  payload?: string;
};

export const reducer = (state: State, action: Action) => {
  if (action.type === "START") {
    return { ...state, status: Status.RUNNING };
  }

  if (action.type === "WIN") {
    return {
      ...state,
      answers: [],
      round: 1,
      status: Status.WIN,
    };
  }

  if (action.type === "LOSE") {
    return {
      ...state,
      answers: [],
      round: 1,
      status: Status.LOSE,
    };
  }

  if (action.type === "ANSWER") {
    const newAnswer = action.payload ?? "";

    return {
      ...state,
      round: state.round + 1,
      answers: [...state.answers, newAnswer],
    };
  }

  throw Error("unexpected action");
};

const Pendu = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordArr = state.word.split("");

  useEffect(() => {
    if (state.round === state.maxRound) {
      dispatch({ type: "LOSE" });
    }
  }, [state.round, state.maxRound]);

  useEffect(() => {
    const res = wordArr.every((l) => {
      return [
        ...state.answers,
        wordArr[0],
        wordArr[wordArr.length - 1],
      ].includes(l);
    });
    if (res) {
      dispatch({ type: "WIN" });
    }
  }, [wordArr, state.answers]);

  const handleAnswer = () => {
    const newLetter = inputRef.current?.value.toLowerCase() ?? "";

    if (state.answers.includes(newLetter)) {
      return;
    }

    dispatch({
      type: "ANSWER",
      payload: newLetter,
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      {state.status === Status.WIN && <span>C'est gagné !</span>}
      {state.status === Status.LOSE && <span>C'est perdu !</span>}
      {state.status === Status.RUNNING && (
        <div>
          <span>
            {state.round} / {state.maxRound}
          </span>
          <div>
            {state.word.split("").map((letter, i, arr) => {
              return (
                <Letter
                  last={i === arr.length - 1}
                  first={i === 0}
                  show={state.answers.includes(letter)}
                  value={letter}
                />
              );
            })}
          </div>
        </div>
      )}
      {state.status === Status.RUNNING && (
        <div className="flex">
          <input
            placeholder="Lettre"
            maxLength={1}
            ref={inputRef}
            className="p-1 border border-black"
            type="text"
          />
          <button onClick={handleAnswer} className="ml-2 border p-2">
            Proposer
          </button>
        </div>
      )}
      {state.status !== Status.RUNNING && (
        <button onClick={() => dispatch({ type: "START" })}>JOUER</button>
      )}
      <div className="flex">
        {state.answers.map((a) => {
          return <span className="line-through ml-1">{a}</span>;
        })}
      </div>
    </div>
  );
};

export default Pendu;
