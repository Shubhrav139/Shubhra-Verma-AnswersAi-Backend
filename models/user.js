const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SchemaObj } = require("../utils/typeConst");

// user schema design
const UserSchema = new mongoose.Schema(
  {
    fullName: SchemaObj.STRING,
    email: SchemaObj.STRING,
    password: SchemaObj.STRING,
    accessToken: SchemaObj.STRING,
    refreshToken: SchemaObj.STRING,
    delete: SchemaObj.BOOLEAN_FALSE,
  },
  { timestamps: true }
);

// Encrypt password using bcrypt method
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("users", UserSchema);
