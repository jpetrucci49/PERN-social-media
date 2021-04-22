var express = require('express');
var router = express.Router();
var pool = require('../main/db');

// Create a user
router.post('/api/users/add', async (req, res, next) => {
  try {
    const { username, email } = req.body.profile;
    await pool.query(
      `INSERT INTO users(username, email)
              VALUES($1, $2)`,
      [username, email],
      (q_err, q_res) => {
        if (q_err) return next(q_err);
        res.json(q_res.rows);
      },
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
