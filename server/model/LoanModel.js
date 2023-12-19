const mongoose = require("mongoose");
const Constant = require("../utils/constant");

// loan schema
const loanSchema = new mongoose.Schema(
  {
    borrower: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: Constant.status,
      default: "PENDING",
    },
    return: {
      type: Boolean,
      default: false,
    },
    submission_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const LoanModel = mongoose.model("LoanModel", loanSchema, "loans");

// export
module.exports = LoanModel;
