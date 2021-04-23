const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config({ path: __dirname + '/.env' });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/', usersRouter);
module.exports = app;
