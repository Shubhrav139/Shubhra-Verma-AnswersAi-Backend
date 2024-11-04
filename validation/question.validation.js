const yup = require("yup");
const mongoose = require("mongoose");

exports.createQuestionValidation = yup.object().shape({
  body: yup.object({
    text: yup.string().required("text is required"),
  }),
});

exports.questionIdValidation = yup.object().shape({
  params: yup.object({
    questionId: yup
      .string()
      .required("questionId is required")
      .test({
        name: "valid-mongodb-id",
        message: "Invalid questionId",
        test: (value) => {
          return mongoose.Types.ObjectId.isValid(value);
        },
      }),
  }),
});
