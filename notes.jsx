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

////////////////////////////////////////////
// sample redux in isolation
////////////////////////////////////////////
// need to install redux react-redux

// in our store ////////////////////
// separate file named store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
export default store;
///////////////////////////////////

////// separate file for the slice ///////
// const initialState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
// };

// export default function accountReducer(state = initialState, action) {
switch (action.type) {
  case "account/deposit":
    return { ...state, balance: state.balance + action.payload };
  case "account/requestLoan":
    return {
      ...state,
      loan: action.payload.amount,
      loanPurpose: action.payload.purpose,
      balance: state.balance + action.payload.amount,
    };
  default:
    return state;
}
// }

// Action creator function
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

/////////////////
//to connect react and redux, in index.js , wrap the app in Provider and add the store props
/////////////
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// to consume the data/access data
const customer = useSelector((store) => store.customer.fullName);

// or another example on consuming
// const dispatch = useDispatch();
const {
  loan: currentLoan,
  loanPurpose: currentLoanPurpose,
  balance,
} = useSelector((store) => store.account);

/////////////////
// old way to connect without redux ////////////////////
function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

// export default connect(mapStateToProps)(BalanceDisplay);

//Middleware ////////////////
// middleware is a function that sits between dispatching that action and the store. Allows us to run after dispatching, but before reaching the reducer in the store
// - perfect for asynchronous code
// - timers, logins or a place for side effects
// Redux thunks - is the 3rd party library

// to use redux thunk
// 1. npm i redux-thunk and apply it to our store
// 2. apply the middleware to our store
// const store = createStore(rootReducer, applyMiddleware(thunk));
// 3. we use the middleware in our action creator function
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  // middleware
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API Call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // dispatch our action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

////////////////////////////
// Redux Dev Tools
///////////////////////////
// 1. add extension on browser Redux DevTools
// 2. npm i redux-devtools-extension
// 3. place the applyMiddleware inside the composeWithDevTools
import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

///////////////////////////
// Redux Toolkit
//////////////////////////
// - modern and preferred way of writing Redux code
// - a lot less code

// 3 big things using redux toolkit
// 1. We can write code that "mutates" state inside reducers (will be converted to immutable logic behind the scenes by "Immer" library)
// 2. Action creators are automatically createad
// 3. Automatic setup of thunk middleware and DevTools

// npm i @reduxjs/toolkit react-redux

////////////////////
// Context vs Redux
///////////////////
// context API + useReducer
// ***pros
// -build into redux (built-in)
// -easy to setup a single context

// ***cons
// -additional state slides requires new context setup from scratch (provider hell in app.js)
// -no mechanism for asynchronous functions
// -optimization is a pain
// -only uses react dev tools

// redux
// ***pros
// -once setup, its easy to create additional state "slices"
// -supports async operations using middleware
// -performance optimization out of the box
// -excellent devtools

// ***cons
// -requires additional package (larger bundle size)
// -more work initially

////////////////////
// React Router v6
///////////////////
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    // routes that dont have a path is considered as Layout Route
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

// to apply our routes
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>Content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

////////////////////
// React Router Loader
///////////////////
// 1. Go to the component and create a loader function for fetch data
export async function loader() {
  const menu = await getMenu();
  return menu;
}

// 2. import the loader
import { loader as menuLoader } from "./features/menu/Menu";

// in the route
// {
//   path: "/menu",
//   element: <Menu />,
//   loader: menuLoader,
// },

// 3. get the data using the cutom hook useLoaderData
const menu = useLoaderData();

////////////////////
// Loader
///////////////////
// to get the state of processing on the fetching data
const navigation = useNavigation();
const isLoading = navigation.state === "loading";

////////////////////
// Error handling in routes
///////////////////
// element: <AppLayout />,
// errorElement: <Error />,

// in our Error component. we can simple add the hook below to access the error message
const error = useRouteError();

////////////////////
// React Router Actions
///////////////////
// loader - is to read data
// action - write data/mutate data on the server, a state that stored on a server

// to create an action
import { Form } from "react-router-dom";

<Form method="POST">{/* fields here... */}</Form>;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

// next is to connect it to our routes
import { action as createOrderAction } from "./features/order/CreateOrder";

// {
//     path: '/order/new',
//     element: <CreateOrder />,
//     action: createOrderAction,
// },

// alternative way, instead of using the form component of the react router, we can use a hidden fields inside the form
<input type="hidden" name="cart" value={JSON.stringify(cart)} />;

// alternative way for navigating to other  page instead of using useNavigate hook, we can use redirect() from react router

////////////////////
// React Toolkit
///////////////////
/////// to setup react toolkit, follow the steps below
////// create this for one of our slice, example below
// const initialState = {
//   username: "",
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

// export the action creators
export const { updateName } = userSlice.actions;

////// create a file named store.js file inside the src folder
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

// const store = configureStore({
//     reducer: {
//         user: userReducer,
//     },
// });

// export default store;

////// go to the topmost of our component tree which is main.js
import { Provider } from "react-redux";
import store from "./store.js";

<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>;

////// as of now, the slice can be accessable, so lets try to consume and access/Read/retrieve data
import { useSelector } from "react-redux";

const username = useSelector((state) => state.user.username);

/////// in dispatching an action for example we want to update any properties in our store we use useDispatch
//we will use the action creator function
import { useDispatch } from "react-redux";

// in this example, we import the method which is the updateName in our of our slice
import { updateName } from "./userSlice";
// const dispatch = useDispatch();
// dispatch(updateName(username));

/////////////////
// Reusing the reducer
/////////////////
// decreaseItemQuantity(state, action) {
//     // decrease the quantity
//     // payload = pizzaId
//     const item = state.cart.find((item) => item.pizzaId === action.payload);

//     item.quantity--;
//     item.totalPrice = item.quantity * item.unitPrice;

//     // calling the deleteItem
//     if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
// }

/////////////////
// Redux Toolkit Thunk
/////////////////
// it recives 2 things
// 1. action
// 2. an async function that will return a payload

// this will also become an action creator function
// it will also produce pending, fullfiled, rejected state
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);

/////////////////
// useFetcher
/////////////////
//it allow us to use a logic from another route
import { useFetcher } from "react-router-dom";

const fetcher = useFetcher();

useEffect(
  function () {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  },
  [fetcher]
);

////////use fetcher into for updating
// it will not navigate away, instead it will revalidate
return (
  <fetcher.Form method="PATCH">
    <Button type="primary">Make priority</Button>
  </fetcher.Form>
);
// to update to property/form/data, we need to wire things up and make an action
// go to the routes and add action to that route to connect the fetcher and the action
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

/////////////////
// CSR or SSR
////////////////
// Client side rendering
// example: React
// 1. plain react
// 2. use to build SPA
// 3. all HTML is rendered on client
// 4. All javascript needs to be downloaded before apps start running: bad for performance
// 5. One perfect use case: apps that are used "internally" as tools inside companies, that are entirely hidden behind the login

// Server side rendering
// example: Next.js, remix.js
// 1. used to build multi-page application MPAs
// 2. some HTML is rendered in the client
// 3. more performant and less javascript to download
// 4. React team is moving more and more in this direction
