const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const secretKey = process.env.jwtsecretKey

function verifyUserToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    jwt.verify(req.token, secretKey, (err, authData) => {
      //console.log({authData});
      if (err) {
        res.status(403).json({ status: 'Forbidden', data: 'Invalid token or expired' });
      } else {
        req.authData = {
          userId: authData.user._id,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ status: 'Unauthorized', data: 'Token not provided' });
  }
}


  // Function to generate JWT token
  function generateToken(user) {
    return jwt.sign({ user }, secretKey, { expiresIn: '60d' });
  }
  
  module.exports = {
    verifyUserToken,
    generateToken,
    // verifyAdminToken
  };