const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define Note Schema
const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Create Note Model
const Note = mongoose.model('Note', noteSchema, 'notes');

// Routes

// GET - Fetch all notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Fetch single note by ID
app.get('/api/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Create new note
app.post('/api/notes', async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            subject: req.body.subject,
            description: req.body.description
        });
        
        const saved = await newNote.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                subject: req.body.subject,
                description: req.body.description
            },
            { new: true }
        );
        
        if (!updated) return res.status(404).json({ error: 'Note not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Delete note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id);
        
        if (!deleted) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});