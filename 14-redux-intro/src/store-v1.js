import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        balance: 0,
        loanPurpose: '',
        balance: state.balance - action.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({
//   type: 'account/deposit',
//   payload: 500,
// });

// store.dispatch({
//   type: 'account/withdraw',
//   payload: 200,
// });

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'to buy a bike' },
// });

// Action creator function
// Account
function deposit(amount) {
  return {
    type: 'account/deposit',
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
function payLoan() {
  return {
    type: 'account/payLoan',
  };
}
store.dispatch(deposit(500));

// Customer
function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toLocaleDateString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}

store.dispatch(createCustomer('Jonas Schmedtmann', '12321321'));
console.log(store.getState());
