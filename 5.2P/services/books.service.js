
const booksModel = require('../models/book.model');

const getAllBooks = () => {

    return booksModel;
};

const getBookById = (id) => {
    return booksModel.find(book => book.id === id);
};

module.exports = {
    getAllBooks,
    getBookById
};