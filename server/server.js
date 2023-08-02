const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require("./routes/auth.router.js");
const rewardsUser = require("./routes/rewardsUser.router.js");

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.static("build"));

/** ---------- ROUTES ---------- **/
app.use("/auth", authRouter);
app.use("/rewards-user", rewardsUser);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log("Listening on port: ", port);
});
