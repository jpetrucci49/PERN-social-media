const db = require('../main/db.js');
const passport = require('passport');
const express = require('express');

const { setToken, hashPassword, requireAuth } = require('./utils');

const router = express.Router();

router.get('/private', requireAuth, (req, res) => {
  res.send('Accessed Private Endpoint');
});

router.post('/api/login', (req, res) => {
  oPts = {
    session: false,
  };
  passport.authenticate('local', oPts, (error, user, info) => {
    if (error) {
      res.status(500).send(error);
    }
    if (info) {
      res.send(info);
    }
    if (!user && !info) {
      res.send('Authentication Failed');
    }
    if (user) {
      const { uid, username, email, first_name, last_name } = user.rows[0];
      const userRes = {
        uid,
        username,
        email,
        first_name,
        last_name,
      };
      //send jwt token as login
      res.send({ ...userRes, token: setToken(userRes) });
    }
  })(req, res);
});

router.post('/api/signup', (req, res) => {
  const { password, username, email, first_name, last_name } = req.body;

  //check if email exists
  const query1 = `SELECT * FROM users
                WHERE email=$1`;

  // query1 takes email
  const values1 = [email];

  //if email not found insert into database
  const query2 = `INSERT INTO users (username, password, email, first_name, last_name)
                VALUES($1, $2, $3, $4, $5)
                RETURNING uid, username, email, first_name, last_name`;

  //signup user, called inside callback1
  const callback2 = (q_err, q_res) => {
    if (q_err) {
      res.status(500).send(q_err);
    }
    //send back user id and info after signup
    if (q_res) {
      const { uid, username, email, first_name, last_name } = q_res.rows[0];

      const user = {
        uid,
        username,
        email,
        first_name,
        last_name,
      };

      //jwt token login after signup
      res.send({ ...user, token: setToken(user) });
    }
  };

  //Check if user exists callback
  const callback1 = (q_err, q_res) => {
    if (q_err) {
      res.status(500).send(q_err);
    }
    if (q_res.rows.length != 0) {
      res.status(400).send('User Already Exists');
    }
    if (q_res.rows.length === 0) {
      //if email not found, create user in db
      //create password hash before saving to db
      hashPassword(password).then((password_hash) => {
        /* values2 has to be scoped
             here inside the .then() call because
             it has to wait until the password
             hash is generated before executing,
             and takes 5 values, as listed.
          */
        const values2 = [username, password_hash, email, first_name, last_name];
        //signup user
        db.query(query2, values2, callback2);
      });
    }
  };

  //check if user exists
  db.query(query1, values1, callback1);
});

module.exports = router;
