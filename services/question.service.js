const questionModel = require("../models/question");

exports.createQuestion = async (payload) => {
  try {
    const saveQuestion = await questionModel(payload).save();
    return saveQuestion;
  } catch (error) {
    throw error;
  }
};

exports.getQuestion = async (cond) => {
  try {
    const question = await questionModel.findOne(cond).select("text answer");
    return question;
  } catch (error) {
    throw error;
  }
};
