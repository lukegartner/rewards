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

module.exports = router;
