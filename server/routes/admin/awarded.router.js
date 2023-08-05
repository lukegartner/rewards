const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "awarded";`)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add new award from admin page
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO awarded (user_id, awarded_value)
        VALUES ($1, $2);
    `;
  const queryArgs = [req.body.user_id, req.body.awarded_value];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Edit award in database users table
router.put("/", (req, res) => {
  const queryText = `
        UPDATE awarded
        SET user_id = $1, awarded_value = $2
        WHERE $3 = id;
        
    `;
  const queryArgs = [req.body.user_id, req.body.awarded_value, req.body.id];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// delete award from database users table
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM awarded 
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
