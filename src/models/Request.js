import mongoose from 'mongoose';


const RequestSchema = new mongoose.Schema(
{
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
category: { type: String, enum: ['Electrician', 'Plumber', 'Carpenter', 'Security', 'Other'], required: true },
description: { type: String, required: true },
status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
assignedTo: { type: String }
},
{ timestamps: true }
);


const Request = mongoose.model('Request', RequestSchema);
export default Request;