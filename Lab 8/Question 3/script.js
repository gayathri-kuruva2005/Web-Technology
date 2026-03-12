// 1. Define the Course class using ES6 Class syntax
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    // Method to display course details using Template Literals
    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

// 2. Instantiate the class (Create a new course object)
let course1 = new Course("Computer Networks", "Dr. Mishra");
course1.displayCourse();

// 3. Implement a Promise to simulate seat availability check
let enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true; // Simulating availability

    if (seatsAvailable) {
        resolve("Enrollment Successful"); // Success case
    } else {
        reject("Course Full");            // Failure case
    }
});

// 4. Handle the Promise using .then() and .catch()
enrollCourse
    .then(msg => console.log(msg))   // Executes if resolve() is called
    .catch(err => console.log(err)); // Executes if reject() is called