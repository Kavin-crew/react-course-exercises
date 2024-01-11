// Closure - is a fact that a function that captures all variables from its lexical scope from where it was defined
//          its like a snapshot of the current values of the variables during that time

////////////////////////////////////////////
// Types of State
////////////////////////////////////////////
// State Accessibility
// Local State - Needed only by one or few components
//             - Only accessible in component and child components
// Global State - Might be needed by many components
//              - accessible to every components in the application
// Remote State - All application data loaded from remote server (API)
//              - usually asynchronous
// UI State     - Everything else, it can be theme, list filters, form data, etc.
//              - usually synchronous and stored in the application

// reducer
import { memo, useContext, useMemo, useReducer } from "react";
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
const initialStates = { count: 0, step: 1 };

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
<PostContext.Provider
  value={{
    user: userID,
    isAuthenticated,
    posts: SeachPosts,
  }}
>
  {/* components here... or JSX */}
</PostContext.Provider>;
// 3. Consumers - all components that read the provided context value
//              - destructure the object to get only the needed properties
const { onClearPosts } = useContext(PostContext);

//////////////////////////////////////////////////////////
// using advance context api and hook pattern
// create a new file for this
// place all states and state updating in this file
import { createContext, useContext } from "react";

// 1. create a context
const PersonContext = createContext();

//export or we will return a provider
function PersonProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  return (
    // 2. PROVIDE VALUE TO CHILD COMPONENTS
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// custom hook that will be exported so we can encapsulated the person context
// that wont be accessable outside
function usePerson() {
  const context = useContext(PersonContext);
  if (context === undefined)
    throw new Error("Context is used outside of the provider");
  return context;
}
// we will export it as named export
// instead of exporting PersonContext, we will export the custom hook instead,
export { PersonProvider, usePerson };

// we need to wrap the components inside the provider
//example in the app component
import { PersonProvider, usePerson } from "./PersonContext";

<PersonProvider>
  <Header />
  <Main />
  <Footer />
</PersonProvider>;

// in consuming the data from each component
function Header() {
  // instead of this
  // const {onClearPosts} = useContext(PersonContext);

  // we do it like this
  const { onClearPosts } = usePerson();
}
///////////////////////end of context api////////////////////////

////////////////////////////////////////////
// ContextApi + reducer pattern
////////////////////////////////////////////
import { createContext, useContext } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer({ state, action }) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: action.payload };

    default:
      "sample text";
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // handle functions here...

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside the provider");
}

export { AuthProvider, useAuth };

////////////////////////////////////////////
// Performance Optimization tools
////////////////////////////////////////////
// 1. Prevent wasted renders
//   - memo
//   - useMemo
//   - useCallback

// When does a components instance re-render?
// a component instance only re-rendered in 3 diff situations
// 1. state changes
// 2. context changes
// 3. parent re-render

// 2. Improve app speed/responsiveness
//   - useMemo
//   - useCallback
//   - useTransition

// 3. Reduce bundle size
//   - using fewer 3rd-party packages
//   - code splitting and lazy loading

////////////////////////////////////////////
// Memo
////////////////////////////////////////////
// memo - we can use memo for memoization or to make a function/component reserve or saved to the memory so it wont rerender if it recieves same props

// Thre big use cases of memo
// - Memoizing props to prevent wasted renders (together with memo)
// - Memoizing values to avaoid expensive re-calculations on every render
// - Memoizing values that are used in the dependency array of another hook

const archiveOptions = useMemo(() => {
  return {
    show: false,
    title: `Post Archive in addition to ${posts.length} main posts`,
  };
}, [posts.length]);

// we can memoized the object on mount when it has no dependency, however, once we have a dependency, and that dependency will update/changes
// it will cause a rerender

// useMemo is somehow like a useState and useEffect which we return an object and will be executed on mounts like the dependency array
// useCallback - is to memoized functions

// useMemo vs useCallback
const handleAddPost = useCallback(function handleAddPost(post) {
  setPosts((posts) => [post, ...posts]);
}, []);

// useMemo will memoized the value, object while the useCallback memoized the function

/////////////////////////
//Things to consider before using memoization, when this is present at SAME TIME
/////////////////////////
// 1. state in the context all the time
// 2. context has many consumers
// 3. app is actually slow or laggy

////////////////////////
//Directions/Guidelines in memoization
// 1. if the context provider has direct children components, wrap all the direct children in memo or instead, place all the components as Component composition and make the direct child as childred prop
function PostProvider({ children }) {}

// component composition
<PostProvider>
  <Header />
  <Main />
  <Archive />
  <Footer />
</PostProvider>;

////////////////////
//Making a context value memoized
const value = useMemo(() => {
  return {
    posts: searchedPosts,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
    searchQuery,
    setSearchQuery,
  };
}, [searchQuery, searchedPosts]);

return (
  // 2. PROVIDE VALUE TO CHILD COMPONENTS
  <PostContext.Provider value={value}>{children}</PostContext.Provider>
);

//////////////////////////
//Bundle and Code Splitting
//////////////////////////
//Bundle - javascript files containing entire application code. downloading all files and load the entire app as SPA
//Bundle Size - amount of javascript files need to download to run a site
//Code Splitting - splitting bundle javascript into multiple parts that can be downloaded over time ("lazy loading")
// step 1
const Homepage = lazy(() => import("./pages/Homepage"));
// step 2 - pull all the routes in the app.js in Suspense api component with a fallback of some loading screen
<Suspense fallback={<SpinnerFullPage />}>
  <Routes>{/* routes here... */}</Routes>
</Suspense>;

//////////////////////////
//useEffect dependency array
//////////////////////////
// 1.every state, props, and context value used inside the effect MUST be included in the dependency array
// 2.all "reactive value"must be included. that means any function or variable that reference any other reactive value
//      - reactive value - props, state, context value, derived state, functions that uses other states
// 3.dependencies choose THEMSELF: never ignore exhausive-deps ESLint rules.
// 4. do not use Objects or arrays in the dependency arrays

//Removing unnecessary dependencies
//1. removing function dependencies
// -move function into effect
// -if you need function in different places, memoized it useCallback
// -if the function doest reference any reactive values, move it outside of the component
//2. removing objects dependencies
// -instead of including entire objects, includes only the properties you need, (primitive values like string, int)
// -if doest work, same strategy memoized the function or move the object
//3. other strategies
// -if you have multiple related reactive values as dependencies, use reducer (useReducer)
// -you dont need to include the setState and dispatch (from useReducer), in the dependencies, as React gurantees them to be stable

// When not to use an effects
// -effects should only be used as last resort, when no other solutions makes sense,

// Three cases Effects is overused
// 1. responding to user evetns -an event handler function should be used instead of effect
// 2. fetching data on component mounth. this is okay in small apps but in real world we use React Query
// 3. synchonizing state changes with one another ( setting state with another state variable). Try to use derived state and event handlers

//////////////////////////
//Redux
//////////////////////////
// 3rd party library to manage global state
// standalone library, but easy to integrate with react apps using react-redux library
// all global state is stored in one globally accessible store, which is easy to update using "actions" (like useReducer)
// its conceptually similar to using Context API + useReducer
// two "versions" : 1. Classic Redux 2. Modern Redux Toolkit

// Why learn redux
// 1. hard to learn
// 2. you will encounter redux code in your job
// 3. some apps require redux
