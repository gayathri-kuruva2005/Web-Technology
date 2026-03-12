// 1. Define the student object
const student = {
    id: 10,
    name: "Kavya",
    department: "CSE",
    marks: 62
};

// 2. Use Object Destructuring to extract values
// This avoids writing student.id, student.name, etc. multiple times
const { id, name, department, marks } = student;

// Display extracted values
console.log(id, name, department, marks);

// 3. Create a new object using the Spread Operator (...)
// The spread operator copies all existing properties from 'student'
// and allows us to add the new 'grade' property easily.
const updatedStudent = {
    ...student,
    grade: marks >= 90 ? "A" : "B" // Logic to assign grade based on marks
};

// Display the updated object
console.log(updatedStudent);