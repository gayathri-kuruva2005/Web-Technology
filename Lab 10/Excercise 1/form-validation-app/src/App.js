import React, { useState } from "react";

function App() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error messages
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
  let newErrors = {};

  if (name === "") {
    newErrors.name = "Name is required";
  }

  if (email === "") {
    newErrors.email = "Email is required";
  } 
  else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (password === "") {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>User Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name}</span>
          )}
        </div>

        <br />

        <div>
          <label>Email:</label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email}</span>
          )}
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;