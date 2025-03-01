"use client";
import { useState } from "react";

export default function Counter({ users }) {
  console.log(users);
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users logged in</p>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
}
