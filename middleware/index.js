const user = require("../models/index");
const { verifyToken } = require("../services/auth");

function checkloggedinUser(cookieName) {
  return(req, res, next) => {
    const tokenValue = req.cookies[cookieName];

    if (!tokenValue) {
     return  next(); // No token present, move to the next middleware
    }

    try {
      const userPayload =  verifyToken(tokenValue);

      // Assuming you want to attach the user information to the request
      req.user = userPayload;

      // Move to the next middleware
      next();
    } catch (error) {
      // Handle the error if token verification fails
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = { checkloggedinUser };
