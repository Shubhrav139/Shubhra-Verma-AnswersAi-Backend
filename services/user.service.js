const userModel = require("../models/user");
const questionModel = require("../models/question");

exports.createUser = async (cond, payload) => {
  try {
    const userAlreadyExists = await userModel.findOne(cond);

    if (userAlreadyExists) {
      return false;
    } else {
      await userModel(payload).save();
      return true;
    }
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (cond) => {
  try {
    const user = await userModel
      .findOne(cond)
      .select("fullName email password");
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (cond, payload) => {
  try {
    const user = await userModel.findOneAndUpdate(cond, payload, {
      new: true,
      runValidators: true,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getAllQuestions = async (cond, pageNumber, pageSize) => {
  try {
    const questions = await questionModel
      .find(cond)
      .select("text answer")
      .sort("-createdAt")
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);
    return questions;
  } catch (error) {
    throw error;
  }
};
