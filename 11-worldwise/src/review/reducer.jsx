import { useReducer } from "react";

// creating a reducer function
function reducer(state, action) {
  if (action.type === "dec") return state - 1;
}

// declaring a useReducer hook
const [count, dispatch] = useReducer(reducer, 0);

// to call the reducer
// for dec
dispatch({ type: "dec" });

// for manually setting the count
dispatch({ type: "setCount", payload: Number(e.target.value) });
