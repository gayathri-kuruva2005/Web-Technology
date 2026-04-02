import React from "react";

function StudentProfile() {
  // Student details stored in variables
  const name = "Gayathri";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Student Profile</h1>

      <table style={{ margin: "0 auto" }}>
        <tbody>
          <tr>
            <td style={{ padding: "5px 20px" }}>Name</td>
            <td>:</td>
            <td style={{ padding: "5px 20px" }}>{name}</td>
          </tr>

          <tr>
            <td style={{ padding: "5px 20px" }}>Department</td>
            <td>:</td>
            <td style={{ padding: "5px 20px" }}>{department}</td>
          </tr>

          <tr>
            <td style={{ padding: "5px 20px" }}>Year</td>
            <td>:</td>
            <td style={{ padding: "5px 20px" }}>{year}</td>
          </tr>

          <tr>
            <td style={{ padding: "5px 20px" }}>Section</td>
            <td>:</td>
            <td style={{ padding: "5px 20px" }}>{section}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentProfile;