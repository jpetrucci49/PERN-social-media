const express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const postRouter = require('./posts');

const indexRouter = express.Router();

indexRouter.get('/hello', (req, res) => {
  res.json('world');
});

module.exports = { indexRouter, usersRouter, authRouter, postRouter };
