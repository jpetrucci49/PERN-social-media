const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config({ path: __dirname + '/.env' });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { indexRouter, usersRouter, authRouter } = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
module.exports = app;
