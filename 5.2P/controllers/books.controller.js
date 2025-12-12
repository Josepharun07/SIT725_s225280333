const bookService = require('../services/books.service');

const getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
    res.json(books);
};

const getBookById = (req, res) => {
    const book = bookService.getBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
};

module.exports = {
    getAllBooks,
    getBookById
};