const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the src directory
app.use('/src', express.static(path.join(__dirname, 'src')));

// Route for /login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Pages/login.html'));
});

// Route for /dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Pages/page.Dashboard.html'));
});

// 404 error handling
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});