const API_URL = 'http://localhost:3000/api';
let currentPage = 1;
const booksPerPage = 6;
let allBooks = [];
let filteredBooks = [];

// Show message
function showMessage(text, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.innerHTML = text;
    msgDiv.className = 'message ' + type;
    setTimeout(() => { msgDiv.innerHTML = ''; }, 3000);
}

// Display books
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    
    if (books.length === 0) {
        booksList.innerHTML = '<div class="empty-state">📚 No books found</div>';
        document.getElementById('pageInfo').textContent = 'Page 0';
        document.getElementById('prevBtn').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        return;
    }
    
    // Pagination
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = books.slice(start, end);
    
    booksList.innerHTML = booksToShow.map(book => `
        <div class="book-card">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-category">${book.category}</div>
            <p class="book-year">📅 ${book.year}</p>
            <p class="book-price">₹ ${book.price}</p>
            <div class="book-rating">
                <span class="rating-stars">${'⭐'.repeat(Math.round(book.rating))}</span>
                <span>${book.rating}/5</span>
            </div>
        </div>
    `).join('');
    
    // Update pagination
    const totalPages = Math.ceil(books.length / booksPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Get all books
async function getAllBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        allBooks = books;
        filteredBooks = books;
        currentPage = 1;
        displayBooks(books);
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('sortBy').value = '';
        showMessage('✅ Showing all books', 'success');
    } catch (err) {
        showMessage('Error loading books: ' + err.message, 'error');
    }
}

// Search books by title
async function searchBooks() {
    const title = document.getElementById('searchInput').value.trim();
    
    if (!title) {
        showMessage('Please enter a title to search', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/books/search?title=${encodeURIComponent(title)}`);
        const books = await response.json();
        
        if (books.length === 0) {
            showMessage('No books found matching: ' + title, 'error');
        } else {
            showMessage(`Found ${books.length} book(s)`, 'success');
        }
        
        filteredBooks = books;
        currentPage = 1;
        displayBooks(books);
    } catch (err) {
        showMessage('Error searching books: ' + err.message, 'error');
    }
}

// Filter by category
async function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    
    if (!category) {
        showMessage('Please select a category', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/books/category/${encodeURIComponent(category)}`);
        const books = await response.json();
        
        if (books.length === 0) {
            showMessage('No books found in category: ' + category, 'error');
        } else {
            showMessage(`Found ${books.length} book(s) in ${category}`, 'success');
        }
        
        filteredBooks = books;
        currentPage = 1;
        displayBooks(books);
    } catch (err) {
        showMessage('Error filtering books: ' + err.message, 'error');
    }
}

// Sort books
async function sortBooks() {
    const sortBy = document.getElementById('sortBy').value;
    
    if (!sortBy) {
        showMessage('Please select a sort option', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/books/sort/${sortBy}`);
        const books = await response.json();
        
        filteredBooks = books;
        currentPage = 1;
        displayBooks(books);
        
        let sortMsg = '';
        if (sortBy === 'price') sortMsg = 'Price (Low to High)';
        else if (sortBy === 'price-desc') sortMsg = 'Price (High to Low)';
        else if (sortBy === 'rating') sortMsg = 'Rating (High to Low)';
        else if (sortBy === 'year') sortMsg = 'Year (Newest First)';
        
        showMessage('Sorted by: ' + sortMsg, 'success');
    } catch (err) {
        showMessage('Error sorting books: ' + err.message, 'error');
    }
}

// Get top rated books
async function getTopRated() {
    try {
        const response = await fetch(`${API_URL}/books/top`);
        const books = await response.json();
        
        if (books.length === 0) {
            showMessage('No highly rated books found', 'error');
        } else {
            showMessage(`Found ${books.length} top rated book(s)`, 'success');
        }
        
        filteredBooks = books;
        currentPage = 1;
        displayBooks(books);
    } catch (err) {
        showMessage('Error loading top rated books: ' + err.message, 'error');
    }
}

// Pagination - Next page
function nextPage() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayBooks(filteredBooks);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Pagination - Previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayBooks(filteredBooks);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Load all books on page load
document.addEventListener('DOMContentLoaded', () => {
    getAllBooks();
});

// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBooks();
    }
});