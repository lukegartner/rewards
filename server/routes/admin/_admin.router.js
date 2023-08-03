const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();
const usersRouter = require("./users.router");
const rewardsRouter = require("./rewards.router");

router.use("/users", usersRouter);
router.use("/rewards", rewardsRouter);

module.exports = router;
