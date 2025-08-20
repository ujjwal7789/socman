import mongoose from 'mongoose';


const NoticeSchema = new mongoose.Schema(
{
title: { type: String, required: true },
description: { type: String, required: true },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{ timestamps: true }
);


const Notice = mongoose.model('Notice', NoticeSchema);
export default Notice;