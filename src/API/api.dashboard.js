const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '../Data/data.credientals.json');

function getUserData(req, res) {
  const userId = req.userId; // Assume userId is passed via middleware
  const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json({ username: user.username, rank: user.rank });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

function getTrainingLessons(req, res) {
  const lessons = [
    { name: 'Basic Medical Training', date: '2024-12-15' },
    { name: 'Advanced Techniques', date: '2024-12-22' },
  ];
  res.json(lessons);
}

function getTimeSpent(req, res) {
  const timeSpent = '15h 30m'; // Fetch or calculate this dynamically
  res.json({ timeSpent });
}

module.exports = { getUserData, getTrainingLessons, getTimeSpent };const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '../Data/data.credientals.json');

function getUserData(req, res) {
  const userId = req.userId; // Assume userId is passed via middleware
  const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json({ username: user.username, rank: user.rank });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

function getTrainingLessons(req, res) {
  const lessons = [
    { name: 'Basic Medical Training', date: '2024-12-15' },
    { name: 'Advanced Techniques', date: '2024-12-22' },
  ];
  res.json(lessons);
}

function getTimeSpent(req, res) {
  const timeSpent = '15h 30m'; // Fetch or calculate this dynamically
  res.json({ timeSpent });
}

module.exports = { getUserData, getTrainingLessons, getTimeSpent };