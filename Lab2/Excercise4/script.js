const userForm = document.getElementById('registrationForm');
const userTableBody = document.getElementById('userTableBody');

// Load users from storage on page load
document.addEventListener('DOMContentLoaded', displayUsers);

userForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    // 1. Mandatory Validations (Done via HTML 'required')
    
    // 2. Mobile number validation (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }

    // 3. Password validation (Minimum 6 characters)
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Get current users from localStorage
    let users = JSON.parse(localStorage.getItem('users') || "[]");

    // 4. Duplicate Email Check
    const exists = users.some(user => user.email === email);
    if (exists) {
        alert("This email is already registered.");
        return;
    }

    // 5. Store as Object
    const newUser = { name, email, mobile, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    userForm.reset();
    displayUsers();
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users') || "[]");
    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1); // Remove user at that index
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

function clearAllUsers() {
    if (confirm("Are you sure you want to delete all user data?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
}