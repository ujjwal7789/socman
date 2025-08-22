// routes/visitorRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import visitorLog from "../models/visitorLog.js";

const router = express.Router();

// Admin: log visitor entry
router.post("/", protect, authorize("Admin"), async (req, res) => {
  const { visitorName, purpose } = req.body;

  try {
    const visitor = await visitorLog.create({
      visitorName,
      purpose,
      loggedBy: req.user._id,
    });
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: mark visitor exit
router.put("/:id/exit", protect, authorize("Admin"), async (req, res) => {
  try {
    const visitor = await visitorLog.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    visitor.outTime = new Date();
    await visitor.save();

    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: view all logs
router.get("/", protect, authorize("Admin"), async (req, res) => {
  try {
    const visitors = await visitorLog.find().populate("loggedBy", "name email");
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
