const mongoose = require("mongoose");
const { SchemaObj } = require("../utils/typeConst");

// question schema design
const QuestionSchema = new mongoose.Schema(
  {
    userId: SchemaObj.USER_ID,
    text: SchemaObj.STRING,
    answer: SchemaObj.STRING,
  },
  { timestamps: true }
);

QuestionSchema.index({
  userId: 1,
});

module.exports = mongoose.model("questions", QuestionSchema);
