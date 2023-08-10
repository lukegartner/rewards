const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "users";`)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add new user from admin page
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO users
        (username, pco_id, balance, admin, avatar)
        VALUES
        ($1, $2, $3, $4, $5);
    `;
  const queryArgs = [
    req.body.username,
    req.body.pco_id,
    req.body.balance,
    req.body.admin,
    req.body.avatar,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Edit user in database users table
router.put("/", (req, res) => {
  const queryText = `
        UPDATE users
        SET username = $1, balance = $2, admin = $3, avatar = $4 
        WHERE $5 = id;
        
    `;
  const queryArgs = [
    req.body.username,
    req.body.balance,
    req.body.admin,
    req.body.avatar,
    req.body.id,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// delete user from database users table
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM users 
        WHERE id = $1;
    `;
  const queryArgs = [req.params.id];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(204))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
