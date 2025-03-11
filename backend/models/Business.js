const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerEmail: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  qrCodeUrl: String,
  formSettings: {
    title: { type: String, default: "Customer Feedback" },
    description: String,
    thankyouMessage: { type: String, default: "Thank you for your feedback!" },
    logoUrl: String,
    themeColor: { type: String, default: "#3B82F6" }
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

module.exports = mongoose.model("Business", businessSchema);