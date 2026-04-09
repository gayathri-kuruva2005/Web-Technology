// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(bodyParser.json()); // Parse JSON body

// ===== MongoDB Connection =====
const mongoURI = 'mongodb://127.0.0.1:27017/crudDB'; // Local MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// ===== Define Mongoose Schema =====
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true }
});

// ===== Create Model =====
const User = mongoose.model('User', userSchema);

// ===== ROUTES =====

// ---- Home Route ----
app.get('/', (req, res) => {
    res.send('Node.js CRUD with MongoDB Home Page');
});

// ---- Create User ----
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Get All Users ----
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Get User by ID ----
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Update User by ID ----
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Delete User by ID ----
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- 404 Middleware ----
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// ---- Error-handling Middleware ----
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Something went wrong!');
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});