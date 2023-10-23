import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    // if the storedValue is null, use the initial state which we declared as empty array upon calling the function
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
