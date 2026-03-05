const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());

// This identifies exactly where your "public" folder is
const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/studentDB')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error: ", err));

// SCHEMAS
const Note = mongoose.model('Note', { title: String, subject: String, description: String });
const Book = mongoose.model('Book', { title: String, price: Number, rating: Number });

// --- THE FIX FOR "CANNOT GET /" ---
app.get('/', (req, res) => {
    // This sends the file directly to the browser
    res.sendFile(path.join(publicDirectoryPath, 'index.html'), (err) => {
        if (err) {
            res.status(404).send("<h1>File Not Found</h1><p>The server is looking for index.html in: " + publicDirectoryPath + "</p>");
        }
    });
});

// --- API ROUTES ---
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
});

app.get('/books/search', async (req, res) => {
    const books = await Book.find({ title: { $regex: req.query.title || '', $options: 'i' } });
    res.json(books);
});

app.listen(3000, () => {
    console.log('------------------------------------');
    console.log('🚀 Server started at http://localhost:3000');
    console.log('📂 Looking for HTML in: ' + publicDirectoryPath);
    console.log('------------------------------------');
});