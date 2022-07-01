// importing necessary files
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// Instantiate the app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);


// Routes
// Home/landing page
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// notes page
app.get("/notes", (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// all error pages for a 404 message
app.get('*', (req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, './public/404.html'))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);