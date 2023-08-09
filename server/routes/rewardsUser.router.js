const pool = require("../modules/pool");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const queryText = `
  INSERT INTO "users" (pco_id, username, balance, admin)
  VALUES ($1, $2, 0, FALSE);`;
  const queryArgs = [req.body.pco_id, req.body.username];

  pool
    .query(queryText, queryArgs)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/:pco_id", (req, res) => {
  const queryText = `SELECT * FROM "users" WHERE pco_id = $1`;
  const queryArgs = [req.params.pco_id];

  pool
    .query(queryText, queryArgs)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/awarded/:id", (req, res) => {
  const queryText = `SELECT * FROM "awarded" WHERE user_id = $1`;
  const queryArgs = [req.params.id];

  pool
    .query(queryText, queryArgs)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get("/redeemed/:id", (req, res) => {
  const queryText = `SELECT * FROM "redeemed" WHERE user_id = $1`;
  const queryArgs = [req.params.id];

  pool
    .query(queryText, queryArgs)
    .then((response) => res.send(response.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
