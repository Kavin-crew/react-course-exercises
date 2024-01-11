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
      return { ...state, loan: action.payload };
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
