// Load notes when page opens
window.onload = loadNotes;

async function loadNotes() {
    const res = await fetch('/notes');
    const data = await res.json();
    const list = document.getElementById('notesList');
    list.innerHTML = data.map(n => `<div class="card"><h3>${n.title}</h3><p>${n.description}</p></div>`).join('');
}

async function addNote() {
    const note = {
        title: document.getElementById('title').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value
    };
    await fetch('/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    });
    location.reload();
}

async function searchBooks() {
    const q = document.getElementById('bookSearch').value;
    const res = await fetch(`/books/search?title=${q}`);
    const data = await res.json();
    document.getElementById('bookList').innerHTML = data.map(b => `<li>${b.title} - $${b.price}</li>`).join('');
}