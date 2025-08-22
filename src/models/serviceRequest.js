// models/ServiceRequest.js
import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

export default ServiceRequest;
