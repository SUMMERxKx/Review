const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  customerName: String,
  customerEmail: String,
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    questionText: String, // Store the text to handle if the question changes later
    answerText: String,
    answerRating: Number
  }],
  overallRating: { type: Number, min: 1, max: 5 },
  aiAnalysis: {
    sentimentScore: Number,
    keyTopics: [String],
    summary: String,
    suggestions: String
  },
  processed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);