const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../Data/data.credientals.json');
const ranks = [
  'Patient',
  'OR-1 Trainee',
  'OR-2 Assistant',
  'OR-3 Jr. Technician',
  'OR-4 Technician',
  'OR-5 Se. Technician',
  'OR-6 Liaison Specialist',
  'OR-7 Clinical Affairs Specialist',
  'OR-8 Medical Affairs Supervisor',
  'OR-9 Se. Medical Affairs Supervisor',
  'OF-1 Clinical Officer',
  'OF-2 Se. Clinical Officer',
  'OF-3 Medical Program Officer',
  'OF-4 Medical Operations Manager',
  'OF-5 Se. Medical Operations Manager',
  'OF-6 Medical Affairs Manager',
  'OF-7 Lead Medical Affairs Manager',
  'OF-8 Medical Affairs Director',
  'OF-9 Se. Medical Affairs Director',
  'OF-10 Deputy Chief Medical Officer',
  'OF-11 Chief Medical Officer',
  'Admin',
  'Super Admin',
];

// Ensure the data file and super admin account exist
function ensureDataFile() {
  if (!fs.existsSync(dataPath)) {
    const initialData = [
      {
        username: 'SuperAdmin',
        password: 'sprAdm',
        rank: 'Super Admin',
      },
    ];
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
  }
}

// Validate login credentials
function validateLogin(username, password) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const user = data.find(
    (entry) => entry.username === username && entry.password === password
  );
  return user ? { success: true, rank: user.rank } : { success: false };
}

// API endpoint for login
function loginAPI(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields.' });
  }

  const result = validateLogin(username, password);
  if (result.success) {
    res.json({ success: true, rank: result.rank });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
}

// API endpoint for Discord OAuth2
function loginWithDiscord(req, res) {
  // Redirect to Discord OAuth2 endpoint
  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify`
  );
}

module.exports = { ensureDataFile, loginAPI, loginWithDiscord };