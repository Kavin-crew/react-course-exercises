import { useReducer } from 'react';
import Product from '../pages/Product';

// creating a reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

// initial state
const initialState = { count: 0, step: 1 };

// declaring a useReducer hook
const [{ count, step }, dispatch] = useReducer(reducer, initialState);

// to call the reducer
// for dec
dispatch({ type: 'dec' });

// for manually setting the count
dispatch({ type: 'setCount', payload: Number(e.target.value) });

// for manually setting the step
dispatch({ type: 'setStep', payload: Number(e.target.value) });

////////////////////////////////////////////
//Routes
////////////////////////////////////////////
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<p>Homepage</p>} />
        <Route path="product" element={<Product />} />
        <Route path="app">
          {/* index will be the default component */}
          <Route index path="list" element={<p>Default list here...</p>} />
          <Route path="cities" element={<p>City here...</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// to call or display the nested route
<Outlet />;

////////////////////////////////////////////
// Link Element
////////////////////////////////////////////

// // used as anchor tag in html
// <link to='/pricing'></link>

// // nav menu
// <ul>
//   <li><NavLink to="/pricing">Pricing</NavLink></li>
// </ul>

////////////////////////////////////////////
// CSS Module
////////////////////////////////////////////

//naming convention
// AppNav.jsx
// AppNav.module.css

// :global(.test){
//   background-color: red;
// }

////////////////////////////////////////////
// Storing state in the URL
////////////////////////////////////////////
// Params - to pass data to next page
// Query String - Global state that will be accessable everywhere

// step 1. create a new route
<Route index path="cities/:id" element={<City>City</City>} />;
// step 2. link to that route
<Link to={`${id}`}>Click Here</Link>;
// step 3. read the state for the url
import { useParams } from 'react-router-dom';
const { id } = useParams();
