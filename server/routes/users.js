var express = require('express');
var router = express.Router();
var pool = require('../main/db');

/* GET a user. */
router.get('/api/get/users/:uid', async (req, res, next) => {
  try {
    const { uid } = req.params;
    await pool.query(
      `SELECT * FROM users
              WHERE uid=$1`,
      [uid],
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
