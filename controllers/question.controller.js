const questionService = require("../services/question.service");
const { sendCustomResponse } = require("../utils/response");
const httpCodes = require("../helpers/httpCodes.json");
const httpMessages = require("../helpers/httpMessages.json");
const { askGemini } = require("../utils/gemini");

exports.createQuestion = async (req, res, next) => {
  try {
    const { text } = req.body;

    const payload = {
      userId: req.user._id,
      text,
    };

    const aiGeneratedAnswer = await askGemini(text);
    payload["answer"] = aiGeneratedAnswer;

    await questionService.createQuestion(payload);

    return sendCustomResponse(
      httpCodes.OK,
      httpMessages.ANSWER_GENERATED,
      aiGeneratedAnswer,
      res
    );
  } catch (error) {
    next(error);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const cond = {
      _id: questionId,
    };

    const question = await questionService.getQuestion(cond);

    return question
      ? sendCustomResponse(
          httpCodes.OK,
          httpMessages.QUESTION_FOUND,
          question,
          res
        )
      : sendCustomResponse(
          httpCodes.NOT_FOUND,
          httpMessages.QUESTION_NOT_FOUND,
          null,
          res
        );
  } catch (error) {
    next(error);
  }
};
