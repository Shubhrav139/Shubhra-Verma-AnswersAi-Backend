const jwt = require("jsonwebtoken");
require("dotenv").config();

// Sign Access Token and return
exports.generateAccessToken = async (userId) => {
  try {
    return jwt.sign(
      {
        id: userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    throw error;
  }
};

// Sign Refresh Token and return
exports.generateRefreshToken = async (userId) => {
  try {
    return jwt.sign(
      {
        id: userId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
