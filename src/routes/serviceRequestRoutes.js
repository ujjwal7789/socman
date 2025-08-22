// routes/serviceRequestRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import serviceRequest from "../models/serviceRequest.js";

const router = express.Router();

// Create a new service request
router.post("/", protect, async (req, res) => {
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

// Get all service requests by the logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const requests = await serviceRequest.find({ requestedBy: req.user._id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin view: all requests (later we can add role-based auth)
router.get("/", protect, async (req, res) => {
  try {
    const requests = await serviceRequest.find().populate("requestedBy", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
