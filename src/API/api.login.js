const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const rateLimiter = require('./api.ratelimiter.js');
const { verifyCaptcha } = require('./api.captcha.js');

const dataPath = path.join(__dirname, '../Data/data.login.json');
const sessionsPath = path.join(__dirname, '../Data/data.sessions.json');

// Ensure data files exist
function ensureDataFile() {
  try {
    // Ensure directories exist
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
    
    // Ensure login data file exists
    if (!fs.existsSync(dataPath)) {
      const initialData = [
        {
          username: 'SuperAdmin',
          password: 'sprAdm',
          rank: 'Super Admin'
        }
      ];
      fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
    }
    
    // Ensure sessions file exists
    if (!fs.existsSync(sessionsPath)) {
      fs.writeFileSync(sessionsPath, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error ensuring data files:', error);
  }
}

// Generate session token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Save session
function saveSession(username, rank) {
  try {
    const sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    const token = generateToken();
    
    // Add new session
    sessions.push({
      token,
      username,
      rank,
      createdAt: new Date().toISOString()
    });
    
    // Save sessions
    fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
    return token;
  } catch (error) {
    console.error('Error saving session:', error);
    return null;
  }
}

// Validate login credentials
function validateLogin(username, password) {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const user = data.find(
      (entry) => entry.username === username && entry.password === password
    );
    return user ? { success: true, rank: user.rank } : { success: false };
  } catch (error) {
    console.error('Error validating login:', error);
    return { success: false };
  }
}

// API endpoint for login
async function loginAPI(req, res) {
  const ip = req.ip;
  const { username, password, captchaResponse } = req.body;
  
  // Check rate limit
  const rateLimit = rateLimiter.checkAttempt(ip);
  
  if (!rateLimit.allowed) {
    return res.status(429).json({ 
      success: false, 
      message: rateLimit.message,
      requiresCaptcha: rateLimit.requiresCaptcha 
    });
  }

  // Verify CAPTCHA if required
  if (rateLimit.requiresCaptcha) {
    if (!captchaResponse) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please complete the CAPTCHA',
        requiresCaptcha: true 
      });
    }

    const captchaResult = await verifyCaptcha(captchaResponse);
    if (!captchaResult.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid CAPTCHA. Please try again.',
        requiresCaptcha: true 
      });
    }
  }

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields.' });
  }

  const result = validateLogin(username, password);
  
  if (result.success) {
    const token = saveSession(username, result.rank);
    if (token) {
      rateLimiter.resetAttempts(ip); // Reset on successful login
      res.json({ 
        success: true, 
        rank: result.rank,
        token: token
      });
    } else {
      res.status(500).json({ success: false, message: 'Error creating session.' });
    }
  } else {
    console.log('Login failed:', { username });
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials.',
      requiresCaptcha: rateLimit.requiresCaptcha
    });
  }
}

// Validate session token
function validateSession(token) {
  try {
    const sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    return sessions.find(session => session.token === token) || null;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

module.exports = { ensureDataFile, loginAPI, validateSession };