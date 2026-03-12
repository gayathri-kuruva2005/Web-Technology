// Variable declaration using let and const
const studentName = "Riya";
let mark1 = 75;
let mark2 = 80;
let mark3 = 68;

// Arrow function to compute the average
const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

// Calculate total and average
let totalMarks = mark1 + mark2 + mark3;
let average = calculateAverage(mark1, mark2, mark3);

// Display results using Template Literals
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${average.toFixed(2)}`);