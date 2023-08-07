const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categories.router");

router.use("/categories", categoriesRouter);

// Get all rewards from database
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
// Get single reward from database
router.get("/selected/:id", (req, res) => {
  const queryText = `
        SELECT rewards.*, reward_category
        FROM "rewards" JOIN "reward_categories" ON rewards.category_id = reward_categories.id
        WHERE rewards.id = $1;
    `;
  pool
    .query(queryText, [req.params.id])
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
router.put("/", (req, res) => {
  const queryText = `
        UPDATE rewards 
        SET reward_title =$1, reward_value =$2, category_id =$3, reward_description =$4, reward_image =$5, reward_active =$6, reward_count =$7
        WHERE $8 = id;
        
    `;
  const queryArgs = [
    req.body.reward_title,
    req.body.reward_value,
    req.body.category_id,
    req.body.reward_description,
    req.body.reward_image,
    req.body.reward_active,
    req.body.reward_count,
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
router.delete("/:id", (req, res) => {
  const queryText = `
        DELETE FROM rewards 
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
