const { generateAccessToken, generateRefreshToken } = require("./jwt");

exports.sendCustomResponse = (statusCode, message, result = null, res) => {
  res.status(statusCode).json({
    message,
    result,
  });
};

exports.sendTokenResponse = async (statusCode, message, user, res) => {
  try {
    // Create token
    let [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(user._id),
      generateRefreshToken(user._id),
    ]);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.save({
      validateBeforeSave: false,
    });

    res.status(statusCode).json({
      message,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
