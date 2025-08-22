// routes/noticeRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import Notice from "../models/Notice.js";

const router = express.Router();

// Create a new notice (protected, admin could be checked later)
router.post("/", protect, async (req, res) => {
  const { title, message } = req.body;

  try {
    const notice = await Notice.create({
      title,
      message,
      createdBy: req.user._id,
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all notices
router.get("/", protect, async (req, res) => {
  try {
    const notices = await Notice.find().populate("createdBy", "name email");
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
