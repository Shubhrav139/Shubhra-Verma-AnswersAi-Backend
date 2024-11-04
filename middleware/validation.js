const httpCodes = require("../helpers/httpCodes.json");
const { sendCustomResponse } = require("../utils/response");

// req.body validation
exports.validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    next();
  } catch (err) {
    return sendCustomResponse(
      httpCodes.BAD_REQUEST,
      err.message,
      err.name,
      res
    );
  }
};

// req.params validation
exports.validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      params: req.params,
    });
    next();
  } catch (err) {
    return sendCustomResponse(httpCodes.BAD_REQUEST, err.message, null, res);
  }
};
