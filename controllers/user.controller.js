const userService = require("../services/user.service");
const { sendCustomResponse, sendTokenResponse } = require("../utils/response");
const httpCodes = require("../helpers/httpCodes.json");
const httpMessages = require("../helpers/httpMessages.json");
const { verifyRefreshToken, generateAccessToken } = require("../utils/jwt");

exports.createUser = async (req, res, next) => {
  try {
    let { fullName, email, password } = req.body;
    email = email.toLowerCase();

    const cond = {
      email,
      delete: false,
    };

    const payload = {
      fullName,
      email,
      password,
    };

    const user = await userService.createUser(cond, payload);

    return user
      ? sendCustomResponse(
          httpCodes.CREATED,
          httpMessages.USER_CREATED,
          null,
          res
        )
      : sendCustomResponse(
          httpCodes.ALREADY_EXIST,
          httpMessages.USER_ALREADY_EXISTS,
          null,
          res
        );
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const cond = {
      _id: userId,
      delete: false,
    };

    const user = await userService.getUser(cond);

    return user
      ? sendCustomResponse(httpCodes.OK, httpMessages.USER_FOUND, user, res)
      : sendCustomResponse(
          httpCodes.NOT_FOUND,
          httpMessages.USER_NOT_FOUND,
          null,
          res
        );
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const cond = {
      email,
      delete: false,
    };

    const user = await userService.getUser(cond);

    if (user) {
      const passwordMatches = await user.matchPassword(password);
      if (passwordMatches) {
        return sendTokenResponse(
          httpCodes.OK,
          httpMessages.USER_LOGGED_IN,
          user,
          res
        );
      } else {
        return sendCustomResponse(
          httpCodes.UNAUTHORIZED,
          httpMessages.PASSWORD_NOT_MATCHED,
          null,
          res
        );
      }
    } else {
      return sendCustomResponse(
        httpCodes.NOT_FOUND,
        httpMessages.USER_NOT_FOUND,
        null,
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.userLogout = async (req, res, next) => {
  try {
    const cond = {
      _id: req.user._id,
      delete: false,
    };

    const payload = {
      accessToken: "",
      refreshToken: "",
    };

    const user = await userService.updateUser(cond, payload);

    return user
      ? sendCustomResponse(
          httpCodes.OK,
          httpMessages.USER_LOGGED_OUT,
          null,
          res
        )
      : sendCustomResponse(
          httpCodes.NOT_FOUND,
          httpMessages.USER_NOT_FOUND,
          null,
          res
        );
  } catch (error) {
    next(error);
  }
};

exports.getRefreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const verify = await verifyRefreshToken(refreshToken);

    if (!verify) {
      return sendCustomResponse(
        httpCodes.FORBIDDEN,
        httpMessages.INVALID_REFRESH_TOKEN,
        null,
        res
      );
    } else {
      const refreshedAccessToken = await generateAccessToken(verify.id);

      await userService.updateUser(
        { _id: verify.id },
        { accessToken: refreshedAccessToken }
      );

      return sendCustomResponse(
        httpCodes.OK,
        httpMessages.ACCESS_TOKEN_SUCCESS,
        refreshedAccessToken,
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { pageNumber = 1, pageSize = 10 } = req.query;

    const cond = {
      userId,
    };

    const questions = await userService.getAllQuestions(
      cond,
      pageNumber,
      pageSize
    );

    return questions.length
      ? sendCustomResponse(
          httpCodes.OK,
          httpMessages.ALL_QUESTIONS_SUCCESS,
          questions,
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
