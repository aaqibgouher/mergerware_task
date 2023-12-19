const mongoose = require("mongoose");
const Constant = require("../utils/constant");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Constant.roles,
      default: "BORROWER",
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model("UserModel", userSchema, "users");

// export
module.exports = UserModel;
