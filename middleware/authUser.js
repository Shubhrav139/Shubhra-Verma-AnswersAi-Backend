const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { sendCustomResponse } = require("../utils/response");
const httpCodes = require("../helpers/httpCodes.json");
const httpMessages = require("../helpers/httpMessages.json");
require('dotenv').config();

// Protect user routes
exports.authUser = async (req, res, next) => {
  let jwtToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    jwtToken = req.headers.authorization.split(" ")[1];
  }

  // Make sure jwtToken exists
  if (!jwtToken)
    return sendCustomResponse(
      httpCodes.UNAUTHORIZED,
      httpMessages.TOKEN_NOT_EXIST,
      null,
      res
    );

  try {
    // Verify jwtToken
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(jwtToken, secret);

    const user = await userModel.findOne({
      _id: decoded.id,
      delete: false,
    });

    if (!user) {
      return sendCustomResponse(
        httpCodes.UNAUTHORIZED,
        httpMessages.UNAUTHORIZED,
        null,
        res
      );
    } else {
      if (user.accessToken != jwtToken) {
        return sendCustomResponse(
          httpCodes.UNAUTHORIZED,
          httpMessages.SESSION_EXPIRED,
          null,
          res
        );
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    return sendCustomResponse(
      httpCodes.INTERNAL_SERVER_ERROR,
      error.message,
      null,
      res
    );
  }
};
