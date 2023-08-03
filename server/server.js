const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require("./routes/auth.router.js");
const rewardsUserRouter = require("./routes/rewardsUser.router.js");
const adminRouter = require("./routes/admin/_admin.router.js");
/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.static("build"));

/** ---------- ROUTES ---------- **/
app.use("/auth", authRouter);
app.use("/rewards-user", rewardsUserRouter);
app.use("/admin", adminRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log("Listening on port: ", port);
});
