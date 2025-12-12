const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
// New requirement
router.get('/integrity-check42', bookController.integrityCheck);

module.exports = router;