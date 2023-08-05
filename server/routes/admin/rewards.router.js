const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categories.router");

router.use("/categories", categoriesRouter);

router.get("/", (req, res) => {
  const queryText = `
        SELECT rewards.*, reward_category
        FROM "rewards" JOIN "reward_categories" ON rewards.category_id = reward_categories.id;
    `;
  pool
    .query(queryText)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add new reward from admin page
router.post("/", (req, res) => {
  const queryText = `
        INSERT INTO rewards 
        (reward_title, reward_value, category_id, reward_description, reward_image, reward_active, reward_count)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7);
    `;
  const queryArgs = [
    req.body.reward_title,
    req.body.reward_value,
    req.body.category_id,
    req.body.reward_description,
    req.body.reward_image,
    req.body.reward_active,
    req.body.reward_count,
  ];
  pool
    .query(queryText, queryArgs)
    .then((response) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
