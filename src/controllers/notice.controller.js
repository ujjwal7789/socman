import Notice from '../models/Notice.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const createNotice = asyncHandler(async (req, res) => {
const { title, description } = req.body;
if (!title || !description) return res.status(400).json({ message: 'Missing fields' });
const notice = await Notice.create({ title, description, createdBy: req.user.id });
res.status(201).json(notice);
});


export const listNotices = asyncHandler(async (req, res) => {
const notices = await Notice.find().sort({ createdAt: -1 }).populate('createdBy', 'name role');
res.json(notices);
});