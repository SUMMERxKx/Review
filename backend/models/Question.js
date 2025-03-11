const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  businessId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Business", 
    required: true 
  },
  questionText: { 
    type: String, 
    required: true 
  },
  questionType: { 
    type: String, 
    enum: ["text", "rating", "multiple-choice", "yes-no"], 
    default: "text" 
  },
  options: [String], // For multiple choice questions
  required: { 
    type: Boolean, 
    default: false 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Question", questionSchema);