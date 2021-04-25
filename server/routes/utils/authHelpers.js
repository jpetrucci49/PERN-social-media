const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const setToken = (user) => {
  let opts = {
    expiresIn: '12h',
  };
  let secret = process.env.TOKEN_SECRET;

  return jwt.sign(user, secret, opts);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

const generateBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) reject(err);
      var token = buf.toString('hex');
      resolve(token);
    });
  });

const hashPassword = (password) =>
  new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      if (hash) resolve(hash);
    }),
  );

const checkPassword = (reqPassword, hashPass, cb) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, hashPass, (err, response) => {
      if (err) reject(err);
      if (response) resolve(response);
      if (!response) cb(null, false, { message: 'Incorrect password' });
    }),
  );

module.exports = {
  checkPassword,
  hashPassword,
  generateBytes,
  setToken,
  verifyToken,
};
