const { validateSession } = require('../API/api.login.js');

function checkAuth(req, res, next) {
  console.log('Checking auth...'); // Debug log
  console.log('Headers:', req.headers); // Debug log
  
  const token = req.headers['authorization'];
  
  if (!token) {
    console.log('No token found'); // Debug log
    // If accessing via browser directly
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      console.log('Redirecting to login (no token)'); // Debug log
      return res.redirect('/login');
    }
    // If API request
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const session = validateSession(token);
  console.log('Session check result:', session); // Debug log
  
  if (!session) {
    console.log('Invalid session'); // Debug log
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.redirect('/login');
    }
    return res.status(401).json({ error: 'Invalid session' });
  }
  
  req.user = session;
  console.log('Auth successful, proceeding...'); // Debug log
  next();
}

module.exports = { checkAuth }; 