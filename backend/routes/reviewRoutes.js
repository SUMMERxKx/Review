const express = require("express");
const Review = require("../models/Review");
const Question = require("../models/Question");
const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");
const { analyzeReview } = require("../utils/geminiApi");

const router = express.Router();

// Submit a new review
router.post("/", async (req, res) => {
  try {
    const { businessId, customerName, customerEmail, answers, overallRating } = req.body;
    
    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    
    // Create new review
    const newReview = new Review({
      businessId,
      customerName,
      customerEmail,
      answers,
      overallRating
    });
    
    // Save review
    await newReview.save();
    
    // Process with Gemini API in background
    processReviewWithAI(newReview._id).catch(err => {
      console.error("Background AI processing failed:", err);
    });
    
    res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error submitting review", error: error.message });
  }
});

// Get all reviews for a business
router.get("/business", authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ businessId: req.business.id })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
});

// Get review analytics for a business
router.get("/analytics", authMiddleware, async (req, res) => {
  try {
    const businessId = req.business.id;
    
    // Get all reviews
    const reviews = await Review.find({ businessId });
    
    // Calculate average sentiment score
    const avgSentiment = reviews.reduce((acc, review) => {
      return acc + (review.aiAnalysis?.sentimentScore || 0);
    }, 0) / (reviews.length || 1);
    
    // Calculate average rating
    const avgRating = reviews.reduce((acc, review) => {
      return acc + (review.overallRating || 0);
    }, 0) / (reviews.length || 1);
    
    // Count reviews by month
    const reviewsByMonth = {};
    reviews.forEach(review => {
      const date = new Date(review.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      reviewsByMonth[monthYear] = (reviewsByMonth[monthYear] || 0) + 1;
    });
    
    // Most common topics
    const topicCounts = {};
    reviews.forEach(review => {
      if (review.aiAnalysis && review.aiAnalysis.keyTopics) {
        review.aiAnalysis.keyTopics.forEach(topic => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
      }
    });
    
    // Sort topics by frequency
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));
    
    res.json({
      totalReviews: reviews.length,
      avgSentiment,
      avgRating,
      reviewsByMonth,
      topTopics,
      recentReviews: reviews.slice(0, 5)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
});

// Get a single review by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    // Make sure the business owns this review
    if (review.businessId.toString() !== req.business.id) {
      return res.status(403).json({ message: "Not authorized to view this review" });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error: error.message });
  }
});

// Get form data for customer (public)
router.get("/form/:businessId", async (req, res) => {
  try {
    const businessId = req.params.businessId;
    
    // Get business info
    const business = await Business.findById(businessId)
      .select('name formSettings qrCodeUrl');
    
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    
    // Get questions
    const questions = await Question.find({ businessId })
      .sort({ order: 1 });
    
    res.json({
      business,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching form data", error: error.message });
  }
});

// Background function to process review with Gemini API
async function processReviewWithAI(reviewId) {
  try {
    // Get the review
    const review = await Review.findById(reviewId);
    if (!review) {
      console.error(`Review ${reviewId} not found for AI processing`);
      return;
    }
    
    // Analyze with Gemini
    const aiAnalysis = await analyzeReview(review);
    
    // Update the review with analysis
    await Review.findByIdAndUpdate(reviewId, {
      aiAnalysis,
      processed: true
    });
    
    console.log(`Successfully processed review ${reviewId} with AI`);
  } catch (error) {
    console.error(`Error processing review ${reviewId} with AI:`, error);
  }
}

module.exports = router;