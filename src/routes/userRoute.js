import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route: GET /api/users/profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;