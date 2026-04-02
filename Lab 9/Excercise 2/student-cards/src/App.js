import React from "react";
import StudentCard from "./StudentCard";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student Cards</h1>

      <StudentCard
        name="Gayathri"
        department="Computer Science"
        marks="85"
      />

      <StudentCard
        name="Rahul"
        department="Information Technology"
        marks="90"
      />

      <StudentCard
        name="Anjali"
        department="Electronics"
        marks="88"
      />
    </div>
  );
}

export default App;