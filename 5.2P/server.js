const express = require('express');
const app = express();
const path = require('path');
const bookRoutes = require('./routes/books.routes');

const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/books', bookRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});