const express = require("express");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all questions for a business
router.get("/business", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ businessId: req.business.id })
      .sort({ order: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
});

// Create a new question
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { questionText, questionType, options, required, order } = req.body;
    
    const newQuestion = new Question({
      businessId: req.business.id,
      questionText,
      questionType,
      options,
      required,
      order
    });
    
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: "Error creating question", error: error.message });
  }
});

// Update a question
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Make sure the business owns this question
    if (question.businessId.toString() !== req.business.id) {
      return res.status(403).json({ message: "Not authorized to edit this question" });
    }
    
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: "Error updating question", error: error.message });
  }
});

// Delete a question
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Make sure the business owns this question
    if (question.businessId.toString() !== req.business.id) {
      return res.status(403).json({ message: "Not authorized to delete this question" });
    }
    
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting question", error: error.message });
  }
});

// Update question order (for drag and drop reordering)
router.post("/reorder", authMiddleware, async (req, res) => {
  try {
    const { questionIds } = req.body;
    
    // Update each question's order
    for (let i = 0; i < questionIds.length; i++) {
      await Question.findByIdAndUpdate(questionIds[i], { order: i });
    }
    
    res.json({ message: "Questions reordered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error reordering questions", error: error.message });
  }
});

module.exports = router;