const questionController = require("../controllers/question.controller");
const { authUser } = require("../middleware/authUser");
const { validateBody, validateParams } = require("../middleware/validation");
const validation = require("../validation/question.validation");

const Router = require("express").Router();

Router.post(
  "",
  authUser,
  validateBody(validation.createQuestionValidation),
  questionController.createQuestion
).get(
  "/:questionId",
  authUser,
  validateParams(validation.questionIdValidation),
  questionController.getQuestionById
);

module.exports = Router;
