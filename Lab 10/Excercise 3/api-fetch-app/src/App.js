import React, { useState, useEffect } from "react";

function App() {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // runs only once

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading data...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  // Main UI
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>User List</h1>

      {data.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid black",
            padding: "15px",
            margin: "12px",
            width: "350px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9"
          }}
        >
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;