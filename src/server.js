const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");

const { userRouter } = require("./routes/user-routes");
const { authRouter } = require("./routes/account-routes");
const app = express();

app.use(helmet());
app.use(json());

app.use("/users", userRouter);
app.use("/account", authRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World Default",
  });
});

module.exports = app;
