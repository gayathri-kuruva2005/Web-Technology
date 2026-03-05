const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

// Create Book Model
const Book = mongoose.model('Book', bookSchema, 'books');

// Initialize sample books
async function initializeSampleBooks() {
    try {
        const count = await Book.countDocuments();
        
        // Only add sample books if collection is empty
        if (count === 0) {
            const sampleBooks = [
                { title: 'JavaScript Essentials', author: 'John Smith', category: 'Programming', price: 450, rating: 4.5, year: 2023 },
                { title: 'Python for Beginners', author: 'Sarah Johnson', category: 'Programming', price: 380, rating: 4.7, year: 2023 },
                { title: 'Web Development with React', author: 'Mike Brown', category: 'Programming', price: 520, rating: 4.6, year: 2024 },
                { title: 'MongoDB Database Guide', author: 'Emily Davis', category: 'Programming', price: 490, rating: 4.4, year: 2023 },
                { title: 'Node.js Complete Course', author: 'David Wilson', category: 'Programming', price: 550, rating: 4.8, year: 2024 },
                { title: 'Data Structures & Algorithms', author: 'Robert Taylor', category: 'Programming', price: 420, rating: 4.9, year: 2023 },
                
                { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', price: 250, rating: 4.3, year: 1925 },
                { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', price: 280, rating: 4.8, year: 1960 },
                { title: '1984', author: 'George Orwell', category: 'Fiction', price: 290, rating: 4.7, year: 1949 },
                { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', price: 270, rating: 4.6, year: 1813 },
                { title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', price: 260, rating: 4.2, year: 1951 },
                { title: 'Wuthering Heights', author: 'Emily Bronte', category: 'Fiction', price: 240, rating: 4.4, year: 1847 },
                
                { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', price: 380, rating: 4.5, year: 1988 },
                { title: 'Cosmos', author: 'Carl Sagan', category: 'Science', price: 410, rating: 4.7, year: 1980 },
                { title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', price: 350, rating: 4.3, year: 1976 },
                { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Science', price: 450, rating: 4.6, year: 2011 },
                { title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', category: 'Science', price: 400, rating: 4.8, year: 2010 },
                
                { title: 'The Art of War', author: 'Sun Tzu', category: 'History', price: 320, rating: 4.5, year: -500 },
                { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', category: 'History', price: 440, rating: 4.6, year: 1997 },
                { title: 'The History of Ancient Rome', author: 'Michael Grant', category: 'History', price: 470, rating: 4.4, year: 2005 },
                { title: 'The French Revolution', author: 'Simon Schama', category: 'History', price: 490, rating: 4.3, year: 1989 },
                
                { title: 'Good to Great', author: 'Jim Collins', category: 'Business', price: 460, rating: 4.7, year: 2001 },
                { title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Business', price: 320, rating: 4.6, year: 1937 },
                { title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', price: 400, rating: 4.5, year: 2011 },
                { title: 'Zero to One', author: 'Peter Thiel', category: 'Business', price: 430, rating: 4.4, year: 2014 },
                { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', category: 'Business', price: 380, rating: 4.8, year: 1989 },
                { title: 'Atomic Habits', author: 'James Clear', category: 'Business', price: 440, rating: 4.9, year: 2018 }
            ];
            
            await Book.insertMany(sampleBooks);
            console.log('Sample books initialized');
        }
    } catch (err) {
        console.log('Error initializing sample books:', err);
    }
}

// Initialize books after connection
mongoose.connection.once('connected', initializeSampleBooks);

// Routes

// GET - Fetch all books with pagination
app.get('/api/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;
        
        const books = await Book.find().skip(skip).limit(limit);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Search books by title
app.get('/api/books/search', async (req, res) => {
    try {
        const title = req.query.title || '';
        const books = await Book.find({ 
            title: { $regex: title, $options: 'i' } 
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Filter books by category
app.get('/api/books/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const books = await Book.find({ category: category });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Sort books
app.get('/api/books/sort/:sortBy', async (req, res) => {
    try {
        const sortBy = req.params.sortBy;
        let sortObj = {};
        
        if (sortBy === 'price') {
            sortObj = { price: 1 };
        } else if (sortBy === 'price-desc') {
            sortObj = { price: -1 };
        } else if (sortBy === 'rating') {
            sortObj = { rating: -1 };
        } else if (sortBy === 'year') {
            sortObj = { year: -1 };
        }
        
        const books = await Book.find().sort(sortObj);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Top rated books
app.get('/api/books/top', async (req, res) => {
    try {
        const books = await Book.find({ rating: { $gte: 4 } })
            .sort({ rating: -1 })
            .limit(5);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});