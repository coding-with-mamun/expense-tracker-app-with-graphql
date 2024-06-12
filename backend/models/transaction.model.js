import mongoose from "mongoose";

// create user schema
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },
    paymentType: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Unknown",
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export user schema
export default mongoose.model("Transaction", transactionSchema);
