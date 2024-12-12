const express = require('express');
const path = require('path');
const { ensureDataFile, loginAPI } = require('./src/API/api.login.js');
const { getTrainingSheets } = require('./src/API/api.worksheet.js');
const { getUserData, getTrainingLessons, getTimeSpent } = require('./src/API/api.dashboard.js');
const { checkAuth } = require('./src/Middleware/auth.middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/src', express.static(path.join(__dirname, 'src')));

ensureDataFile();

// Root path redirect
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  // If user is already logged in, redirect to dashboard
  if (req.headers['user-rank']) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.join(__dirname, 'src/Pages/page.login.html'));
});

// Protected routes
app.get('/dashboard', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Pages/page.dashboard.html'));
});

// API endpoints
app.post('/api/login', loginAPI);
app.get('/api/worksheet/sheets', checkAuth, getTrainingSheets);
app.get('/api/dashboard/user', checkAuth, getUserData);
app.get('/api/dashboard/lessons', checkAuth, getTrainingLessons);
app.get('/api/dashboard/time', checkAuth, getTimeSpent);

// 404 error handling
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});