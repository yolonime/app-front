import { DECREMENT, INCREMENT } from "../actions";

export type State = {
  count: number;
};

export type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: State, action: Action) => {
  if (action.type === INCREMENT) {
    return { count: state.count + 1 };
  }

  if (action.type === DECREMENT) {
    return { count: state.count - 1 };
  }
  
  throw Error("unexpected action");
};
