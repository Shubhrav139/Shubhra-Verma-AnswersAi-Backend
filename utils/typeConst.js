const mongoose = require("mongoose");

exports.SchemaObj = {
  STRING: {
    type: String,
    default: "",
  },
  BOOLEAN_FALSE: {
    type: Boolean,
    default: false,
  },
  BOOLEAN_TRUE: {
    type: Boolean,
    default: true,
  },
  USER_ID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    default: null,
  },
};
