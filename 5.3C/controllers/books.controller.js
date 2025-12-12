// controllers/books.controller.js
const bookService = require('../services/books.service');

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Required by Task 5.3C PDF (Step 4 in instructions)
const integrityCheck = (req, res) => {
    res.status(204).send();
};

module.exports = {
    getAllBooks,
    getBookById,
    integrityCheck
};