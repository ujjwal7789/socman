// models/VisitorLog.js
import mongoose from "mongoose";

const visitorLogSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    purpose: { type: String, required: true },
    inTime: { type: Date, default: Date.now },
    outTime: { type: Date },
    loggedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const VisitorLog = mongoose.model("VisitorLog", visitorLogSchema);

export default VisitorLog;