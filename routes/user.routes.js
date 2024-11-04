const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware/authUser");
const { validateBody, validateParams } = require("../middleware/validation");
const validation = require("../validation/user.validation");

const Router = require("express").Router();

Router.post(
  "",
  validateBody(validation.createUserValidation),
  userController.createUser
)
  .get(
    "/:userId",
    authUser,
    validateParams(validation.userIdValidation),
    userController.getUserById
  )
  .get(
    "/:userId/questions",
    authUser,
    validateParams(validation.userIdValidation),
    userController.getAllQuestions
  );

module.exports = Router;
