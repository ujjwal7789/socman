// routes/serviceRequestRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import serviceRequest from "../models/serviceRequest.js";

const router = express.Router();

// Resident: create request
router.post("/", protect, authorize("Resident"), async (req, res) => {
  const { description } = req.body;

  try {
    const request = await serviceRequest.create({
      description,
      requestedBy: req.user._id,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resident: view own requests
router.get("/my", protect, authorize("Resident"), async (req, res) => {
  try {
    const requests = await serviceRequest.find({ requestedBy: req.user._id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: view all requests
router.get("/", protect, authorize("Admin"), async (req, res) => {
  try {
    const requests = await serviceRequest.find().populate("requestedBy", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
