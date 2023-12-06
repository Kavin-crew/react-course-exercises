import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "../pages/Product";

// creating a reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

// initial state
const initialState = { count: 0, step: 1 };

// declaring a useReducer hook
const [{ count, step }, dispatch] = useReducer(reducer, initialState);

// to call the reducer
// for dec
dispatch({ type: "dec" });

// for manually setting the count
dispatch({ type: "setCount", payload: Number(e.target.value) });

// for manually setting the step
dispatch({ type: "setStep", payload: Number(e.target.value) });

////////////////////////////////////////////
//Routes
////////////////////////////////////////////
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
