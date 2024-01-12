import { useSelector } from 'react-redux';

function Customer() {
  const customer = useSelector(store => store.customer);

  return <h2>👋 Welcome, %NAME%</h2>;
}

export default Customer;
