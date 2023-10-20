import { useEffect, useState } from 'react';

export default function App() {
  // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  const [convertTo, setConvertTo] = useState('EUR');
  const [convertFrom, setConvertFrom] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState();

  useEffect(
    function () {
      const controller = new AbortController();
      async function request() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${convertTo}&to=${convertFrom}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setOutput(data.rates[convertFrom]);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.log(error.message);
          }
        }
      }
      if (convertTo === convertFrom) return setOutput(amount);
      request();

      return function () {
        controller.abort();
      };
    },
    [amount, convertTo, convertFrom, output]
  );

  return (
    <div>
      <input
        type="text"
        value={Number(amount)}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {convertFrom}
      </p>
    </div>
  );
}
