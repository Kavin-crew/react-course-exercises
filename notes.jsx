import { useReducer } from "react";
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
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import { useParams } from "react-router-dom";
const { id } = useParams();

// Query String
// in this example, that variable name will be lat and lng
<Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}>Click Here</Link>;

// to consume the query string from the url
// useSearchParams is also like a useState,
// we will get the variable in the url
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();
const lat = searchParams.get("lat");
const lng = searchParams.get("lng");

//to change the state, we send an object
//changing the setter Params  will update the value of everywhere
<button onClick={() => setSearchParams({ lat: 23, lng: 50 })}></button>;

////////////////////////////////////////////
// useNavigate
////////////////////////////////////////////
// programmatic navigation is navigating without letting the user click a link
// common usecase is when after submiting a form

// useNavigate hook will return a function called navigate
// once we click the button, it will open the form component
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
<button onClick={() => navigate("form")}></button>;

// small comaparison
// imperative way of navigation
<NavLink to="cities">Click Here</NavLink>;

//in declarative way of navigation
navigate("form");

// using useNavigation as going back
//const navigate = useNavigate();
<button onClick={() => navigate(-1)}></button>;

// Navigate component of react is like a redirect
// we add replace so we can go back from the history stack
<Route index element={<Navigate replace to="cities" />} />;

////////////////////////////////////////////
// ContextApi
////////////////////////////////////////////
// 1. Provider - provides all child components access to value
//             - to topmost level component
//             - in naming a context, always start with capital letter since its also a component
const PostContext = createContext();
// 2. Value - data that we want to make available (usually   state and function)
<PostContext.Provider value={{ user, isAuthenticated }}>
  {/* components here... or JSX */}
</PostContext.Provider>;
// 3. Consumers - all components that read the provided context value
//              - destructure the object to get only the needed properties
const { onClearPosts } = useContext(PostContext);
