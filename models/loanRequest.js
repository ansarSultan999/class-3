import mongoose from "mongoose";

const loanRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  repaymentPeriod: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

export default LoanRequest;
