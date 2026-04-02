import React, { useState } from "react";

function App() {
  // Step 1: Create state variable
  const [count, setCount] = useState(0);

  // Step 2: Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Step 3: Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Simple Counter</h1>

      <h2>{count}</h2>

      <button
        onClick={increment}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Increment
      </button>

      <button
        onClick={decrement}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;