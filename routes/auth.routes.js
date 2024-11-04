const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware/authUser");
const { validateBody } = require("../middleware/validation");
const validation = require("../validation/user.validation");

const Router = require("express").Router();

Router.post(
  "/login",
  validateBody(validation.userLoginValidation),
  userController.userLogin
)
  .post("/logout", authUser, userController.userLogout)
  .post(
    "/refresh",
    validateBody(validation.refreshTokenValidation),
    userController.getRefreshAccessToken
  );

module.exports = Router;
