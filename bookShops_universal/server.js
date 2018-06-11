const express = require('express');
const app = express();
const path = require('path');

// Middleware to define folder for static files (images)
app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Web-server is listening on port 3000');
});

