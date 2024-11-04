("use strict");
const Router = require("express").Router();
const userRoute = require("./user.routes");
const authRoute = require("./auth.routes");
const questionRoute = require("./question.routes");

Router.use("/users", userRoute);
Router.use("/auth", authRoute);
Router.use("/questions", questionRoute);

module.exports = Router;
