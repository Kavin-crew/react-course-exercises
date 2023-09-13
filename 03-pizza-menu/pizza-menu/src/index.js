import React from 'react';
import ReactDOM from 'react-dom/client';
// before react v18
// import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello!</h1>;
}

// react v18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// react before v18
// ReactDOM.render(<App />, document.getElementById('root'));
