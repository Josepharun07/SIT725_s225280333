
const listView = document.getElementById('book-list-view');
const detailView = document.getElementById('book-detail-view');
const detailContent = document.getElementById('detail-content');
const bookListDiv = document.getElementById('book-list');
const loadingMsg = document.getElementById('loading-msg');

document.addEventListener('DOMContentLoaded', () => {

    loadBooks();
});

function loadBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            loadingMsg.style.display = 'none';
            bookListDiv.innerHTML = '';

            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';
                

                card.onclick = () => loadBookDetails(book.id);

                const title = document.createElement('h3');
                title.className = 'book-title';
                title.textContent = book.title;
                
                const author = document.createElement('p');
                author.className = 'book-author';
                author.innerHTML = `<span class="label">Author:</span> ${book.author}`;

                card.appendChild(title);
                card.appendChild(author);
                bookListDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            loadingMsg.textContent = 'Failed to load books.';
        });
}

function loadBookDetails(id) {

    fetch(`/api/books/${id}`)
        .then(response => response.json())
        .then(book => {
            renderDetailView(book);
        })
        .catch(err => console.error(err));
}

function renderDetailView(book) {

    listView.style.display = 'none';
    detailView.style.display = 'block';


    detailContent.innerHTML = `
        <div class="detail-container">
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author"><span class="label">Author:</span> ${book.author}</p>
            <p><span class="label">Year:</span> ${book.year}</p>
            <p><span class="label">Genre:</span> ${book.genre}</p>
            <p class="detail-summary">${book.summary}</p>
        </div>
    `;
}


function showList() {
    detailView.style.display = 'none';
    listView.style.display = 'block';
}