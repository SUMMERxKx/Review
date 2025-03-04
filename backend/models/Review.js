const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  customerName: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  sentimentScore: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
