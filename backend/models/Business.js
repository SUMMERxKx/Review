const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerEmail: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  qrCodeUrl: String,
});

module.exports = mongoose.model("Business", businessSchema);
