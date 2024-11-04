const yup = require("yup");
const mongoose = require("mongoose");

exports.createUserValidation = yup.object().shape({
  body: yup.object({
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Enter a valid email"),
    fullName: yup
      .string()
      .required("fullName is required")
      .matches(/^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/, "Enter a valid fullName"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Password must be min 6 character and must contain lowercase, uppercase and special characters"
      ),
  }),
});

exports.userIdValidation = yup.object().shape({
  params: yup.object({
    userId: yup
      .string()
      .required("userId is required")
      .test({
        name: "valid-mongodb-id",
        message: "Invalid userId",
        test: (value) => {
          return mongoose.Types.ObjectId.isValid(value);
        },
      }),
  }),
});

exports.refreshTokenValidation = yup.object().shape({
  body: yup.object({
    refreshToken: yup.string().required("refreshToken is required"),
  }),
});

exports.userLoginValidation = yup.object().shape({
  body: yup.object({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
  }),
});
