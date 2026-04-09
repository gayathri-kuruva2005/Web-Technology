// app.js

const express = require('express');
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
    res.send("Server is running successfully");
});

// Users data (in-memory)
let users = [
    { id: 1, name: "Gayathri" },
    { id: 2, name: "Ravi" }
];

// ======================
// GET all users
// ======================
app.get('/users', (req, res) => {
    res.json(users);
});

// ======================
// GET user by ID
// ======================
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// ======================
// POST: Add a new user
// ======================
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1, // auto-increment ID
        name: req.body.name
    };
    users.push(newUser);
    res.json({ message: "User added successfully", user: newUser });
});

// ======================
// PUT: Update a user
// ======================
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (user) {
        user.name = req.body.name;
        res.json({ message: "User updated successfully", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// ======================
// DELETE: Remove a user
// ======================
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);              // get ID from URL
    const index = users.findIndex(u => u.id === id); // find user index

    if (index !== -1) {
        const deletedUser = users.splice(index, 1); // remove user from array
        res.json({ message: "User deleted successfully", user: deletedUser[0] });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// ======================
// Start server
// ======================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});