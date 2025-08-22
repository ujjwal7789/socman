import express from 'express';
import protect from '../middleware/authMiddleware.js';
import authorize from "../middleware/roleMiddleware.js";
import Notice from '../models/Notice.js'
// import { createNotice, listNotices } from '../controllers/notice.controller.js';


const router = express.Router();

router.post("/", protect, authorize("Admin"), async (req, res) => {
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

// All: view notices
router.get("/", protect, async (req, res) => {
  try {
    const notices = await Notice.find().populate("createdBy", "name email");
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;