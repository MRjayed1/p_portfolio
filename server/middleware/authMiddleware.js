const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const bearer = token.split(' ');
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
