import Request from '../models/Request.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const createRequest = asyncHandler(async (req, res) => {
const { category, description } = req.body;
if (!category || !description) return res.status(400).json({ message: 'Missing fields' });
const doc = await Request.create({ userId: req.user.id, category, description });
res.status(201).json(doc);
});


export const listMyRequests = asyncHandler(async (req, res) => {
const docs = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });
res.json(docs);
});


export const listAllRequests = asyncHandler(async (req, res) => {
const docs = await Request.find().sort({ createdAt: -1 }).populate('userId', 'name flatNo phone');
res.json(docs);
});


export const updateRequestStatus = asyncHandler(async (req, res) => {
const { id } = req.params;
const { status, assignedTo } = req.body;
const allowed = ['Pending', 'In-Progress', 'Resolved'];
if (status && !allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
const updated = await Request.findByIdAndUpdate(
id,
{ $set: { ...(status && { status }), ...(assignedTo && { assignedTo }) } },
{ new: true }
);
if (!updated) return res.status(404).json({ message: 'Request not found' });
res.json(updated);
});