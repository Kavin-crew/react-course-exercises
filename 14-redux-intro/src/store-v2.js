import { combineReducers, createStore, applyMiddleware } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// redux toolkit
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
