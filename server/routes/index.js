const express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');

const indexRouter = express.Router();

indexRouter.get('/hello', (req, res) => {
  res.json('world');
});

module.exports = { indexRouter, usersRouter, authRouter };
