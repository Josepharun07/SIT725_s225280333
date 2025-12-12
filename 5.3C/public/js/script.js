
document.getElementById('get-books-btn').addEventListener('click', loadBooks);

function loadBooks() {

    const btn = document.getElementById('get-books-btn');
    btn.textContent = "Loading...";

    fetch('/api/books')
        .then(res => res.json())
        .then(books => {
            btn.textContent = "Get all books"; 
            
            const listContainer = document.getElementById('book-list');
            const listView = document.getElementById('list-view');
            const detailView = document.getElementById('detail-view');
            
            listView.style.display = 'block';
            detailView.style.display = 'none';
            listContainer.innerHTML = '';

            books.forEach(book => {
                const div = document.createElement('div');
                div.className = 'book-item';
                
                div.innerHTML = `
                    <span>${book.title}</span>
                    <span style="color: #666; font-weight: normal;">${book.price} AUD</span>
                `;
                
                div.onclick = () => loadDetails(book.id);
                
                listContainer.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
            btn.textContent = "Error loading books";
        });
}

function loadDetails(id) {
    fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(book => {
            const listView = document.getElementById('list-view');
            const detailView = document.getElementById('detail-view');
            const detailContent = document.getElementById('detail-content');

            listView.style.display = 'none';
            detailView.style.display = 'block';

            detailContent.innerHTML = `
                <div class="detail-row"><span class="label">Title:</span> ${book.title}</div>
                <div class="detail-row"><span class="label">Author:</span> ${book.author}</div>
                <div class="detail-row"><span class="label">Year:</span> ${book.year}</div>
                <div class="detail-row"><span class="label">Genre:</span> ${book.genre}</div>
                <div class="detail-row"><span class="label">Price:</span> ${book.price} AUD</div>
                <div style="margin-top: 15px; line-height: 1.6; color: #444;">
                    <strong>Summary:</strong><br>${book.summary}
                </div>
                <br>
                <button onclick="document.getElementById('get-books-btn').click()" style="background-color: #6c757d;">Back to List</button>
            `;
        })
        .catch(err => console.error(err));
}