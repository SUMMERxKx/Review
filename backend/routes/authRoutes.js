const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Business = require("../models/Business");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, ownerEmail, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const business = await Business.create({ name, ownerEmail, passwordHash });
    res.status(201).json({ message: "Business registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering business" });
  }
});

router.post("/login", async (req, res) => {
  const { ownerEmail, password } = req.body;
  const business = await Business.findOne({ ownerEmail });

  if (!business || !(await bcrypt.compare(password, business.passwordHash))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
