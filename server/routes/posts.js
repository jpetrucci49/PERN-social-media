var express = require('express');
var router = express.Router();
var db = require('../main/db');

/* POST a post. */
router.post('/api/posts', async (req, res, next) => {
  try {
    const { uid, parentId, title, body, author } = req.body;
    const insertQuery = `INSERT INTO posts (uid, parent_id, title, body, author)
                VALUES($1, $2, $3, $4, $5)
                RETURNING *`;
    await db.query(insertQuery, [uid, parentId, title, body, author], (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    });
  } catch (err) {
    console.error(err);
  }
});

// /* Is account already registered? */
// router.post('/api/user', async (req, res, next) => {
//   try {
//     const { email, username } = req.body;
//     if (email) {
//       await pool.query(
//         `SELECT * FROM users
//               WHERE email=$1`,
//         [email],
//         (q_err, q_res) => {
//           if (q_err) return next(q_err);
//           if (q_res.rows.length != 0) {
//             res.send('This Email is already registered');
//           } else {
//             res.send(false);
//           }
//         },
//       );
//     }
//     if (username) {
//       await pool.query(
//         `SELECT * FROM users
//               WHERE username=$1`,
//         [username],
//         (q_err, q_res) => {
//           if (q_err) return next(q_err);
//           if (q_res.rows.length != 0) {
//             res.send('This Username is already registered');
//           } else {
//             res.send(false);
//           }
//         },
//       );
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

module.exports = router;
