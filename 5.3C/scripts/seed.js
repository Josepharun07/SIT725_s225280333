// scripts/seed.js
const mongoose = require('mongoose');
const Book = require('../models/book.model');

// Hardcoded URI (Task Requirement)
const MONGO_URI = 'mongodb://127.0.0.1:27017/sit725_books';

const books = [
    {
        id: "b1",
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        year: 2008,
        genre: "Science Fiction",
        summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy.",
        price: 29.99
    },
    {
        id: "b2",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        year: 1847,
        genre: "Classic",
        summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall.",
        price: 22.00
    },
    {
        id: "b3",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Classic",
        summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations.",
        price: 22.00
    },
    {
        id: "b4",
        title: "The English Patient",
        author: "Michael Ondaatje",
        year: 1992,
        genre: "Historical Fiction",
        summary: "In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory.",
        price: 25.39
    },
    {
        id: "b5",
        title: "Small Gods",
        author: "Terry Pratchett",
        year: 1992,
        genre: "Fantasy",
        summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma.",
        price: 31.99
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB...');
        
        await Book.deleteMany({}); // Clear old data
        await Book.insertMany(books); // Insert new data
        
        console.log('Seeded 5 books successfully!');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding DB:', error);
    }
};

seedDB();