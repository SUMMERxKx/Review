const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");
const { generateQRCode } = require("../utils/qrCodeGenerator");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, ownerEmail, password } = req.body;

  try {
    // Check if business already exists
    const existingBusiness = await Business.findOne({ ownerEmail });
    if (existingBusiness) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const business = await Business.create({ 
      name, 
      ownerEmail, 
      passwordHash,
      formSettings: {
        title: `${name} Feedback`,
        description: `We value your feedback!`
      }
    });
    
    // Generate QR code
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    await generateQRCode(business._id, baseUrl);
    
    res.status(201).json({ message: "Business registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error registering business", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { ownerEmail, password } = req.body;
  
  try {
    const business = await Business.findOne({ ownerEmail });

    if (!business || !(await bcrypt.compare(password, business.passwordHash))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update last login timestamp
    await Business.findByIdAndUpdate(business._id, { lastLogin: new Date() });

    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    
    res.json({ 
      token,
      business: {
        id: business._id,
        name: business.name,
        email: business.ownerEmail
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Get business profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const business = await Business.findById(req.business.id).select('-passwordHash');
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

// Update business profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, formSettings } = req.body;
    
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.business.id,
      { 
        name,
        formSettings
      },
      { new: true }
    ).select('-passwordHash');
    
    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error: error.message });
  }
});

// Regenerate QR code
router.post("/regenerate-qr", authMiddleware, async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const qrCodeData = await generateQRCode(req.business.id, baseUrl);
    res.json(qrCodeData);
  } catch (error) {
    res.status(500).json({ message: "Error regenerating QR code", error: error.message });
  }
});

module.exports = router;