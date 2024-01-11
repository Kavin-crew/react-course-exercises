import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

store.dispatch({
  type: 'account/deposit',
  payload: 500,
});

store.dispatch({
  type: 'account/withdraw',
  payload: 200,
});

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'to buy a bike' },
});

console.log(store.getState());
