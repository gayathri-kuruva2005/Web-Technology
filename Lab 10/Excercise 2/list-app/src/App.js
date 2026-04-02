import React, { useState } from "react";

function App() {
  // State to store list items
  const [items, setItems] = useState([]);

  // State for input value
  const [input, setInput] = useState("");

  // Add item function
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  // Remove item function
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Item List</h1>

      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={addItem}
        style={{ marginLeft: "10px" }}
      >
        Add Item
      </button>

      <br /><br />

      {/* Conditional Rendering */}
      {items.length === 0 ? (
        <p>No items in the list</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}

              <button
                onClick={() => removeItem(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;