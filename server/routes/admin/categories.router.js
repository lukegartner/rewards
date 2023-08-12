const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "reward_categories";`)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add new user from admin page
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO reward_categories
        (reward_category, category_active)
        VALUES
        ($1, $2);
    `;
  const queryArgs = [req.body.reward_category, req.body.category_active];
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
        UPDATE reward_categories
        SET reward_category = $1, category_active = $2
        WHERE $3 = id;
        
    `;
  const queryArgs = [
    req.body.reward_category,
    req.body.category_active,
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
        DELETE FROM reward_categories 
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
