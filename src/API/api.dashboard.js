const fs = require('fs');
const path = require('path');

const userDataPath = path.join(__dirname, '../Data/data.credentials.json');

function getUserData(req, res) {
  try {
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const user = users.find((u) => u.rank === req.userRank);
    if (user) {
      res.json({ username: user.username, rank: user.rank });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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
  try {
    const users = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const user = users.find((u) => u.rank === req.userRank);
    if (user) {
      res.json({ timeSpent: user.timeSpent });
    } else {
      res.json({ timeSpent: '0h 0m' });
    }
  } catch (error) {
    res.json({ timeSpent: '0h 0m' });
  }
}

module.exports = { getUserData, getTrainingLessons, getTimeSpent };