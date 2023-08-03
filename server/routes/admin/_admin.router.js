const pool = require("../../modules/pool");
const express = require("express");
const router = express.Router();
const usersRouter = require("./users.router");
const rewardsRouter = require("./rewards.router");
const redeemedRouter = require("./redeemed.router");
const awardedRouter = require("./awarded.router");

router.use("/users", usersRouter);
router.use("/rewards", rewardsRouter);
router.use("/redeemed", redeemedRouter);
router.use("/awarded", awardedRouter);

module.exports = router;
