const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "redeemed";`)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
// Add new redeemed from admin page
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO redeemed (user_id,  reward_id, redeemed_value, complete)
        VALUES ($1, $2, $3, $4);
    `;
  const queryArgs = [
    req.body.user_id,
    req.body.reward_id,
    req.body.redeemed_value,
    req.body.complete,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Edit redemption in database redeemed table
router.put("/", (req, res) => {
  const queryText = `
        UPDATE redeemed
        SET user_id = $1, reward_id = $2, redeemed_value = $3, complete = $5
        WHERE id = $4;
        
    `;
  const queryArgs = [
    req.body.user_id,
    req.body.reward_id,
    req.body.redeemed_value,
    req.body.id,
    req.body.complete,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// delete redemption from database redeemed table
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM redeemed 
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
