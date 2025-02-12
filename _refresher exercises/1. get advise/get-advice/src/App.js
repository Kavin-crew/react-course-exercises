import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data.slip.advice);

    setAdvice(data.slip.advice);
    setCount((currentCount) => currentCount + 1);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <h1>
        Here's the advice from the API: <i>{advice}</i>
      </h1>
      <Message numberCount={count} />
      <button onClick={getAdvice}>Get advice</button>
    </>
  );
}

function Message(props) {
  return <p>generated {props.numberCount} number of advice</p>;
}
