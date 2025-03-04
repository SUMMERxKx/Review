const express = require("express");
const Review = require("../models/Review");
const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const { businessId, customerName, rating, comment } = req.body;
  const newReview = new Review({ businessId, customerName, rating, comment });
  await newReview.save();
  res.status(201).json({ message: "Review submitted successfully." });
});

router.get("/:businessId", authMiddleware, async (req, res) => {
  const reviews = await Review.find({ businessId: req.params.businessId });
  res.json(reviews);
});

module.exports = router;
