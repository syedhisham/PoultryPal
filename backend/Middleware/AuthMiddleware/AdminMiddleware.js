const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Check if authHeader is defined before splitting

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed! No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied! Only admins are allowed.' });
      }
    
    // Attach the decoded user ID to the request object
    req.user = decoded.user;
    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication failed! Token expired.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Authentication failed! Invalid token.' });
    } else {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

module.exports = adminMiddleware;