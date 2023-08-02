const express = require("express");
// require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require("./routes/auth.router.js");

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.static("build"));

/** ---------- ROUTES ---------- **/
app.use("/auth", authRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log("Listening on port: ", port);
});
