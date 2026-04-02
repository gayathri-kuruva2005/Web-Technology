import React from "react";

function StudentCard(props) {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "15px",
        margin: "10px",
        width: "250px",
        display: "inline-block",
        borderRadius: "8px"
      }}
    >
      <h3>Student Card</h3>

      <p>
        <b>Name:</b> {props.name}
      </p>

      <p>
        <b>Department:</b> {props.department}
      </p>

      <p>
        <b>Marks:</b> {props.marks}
      </p>
    </div>
  );
}

export default StudentCard;