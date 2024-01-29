import mongoose, { Schema } from "mongoose";
import { ActionLog } from "../models/ActionLog";

const ActionLogSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, enum: ['ADD', 'DELETE'], required: true },
    points: { type: Number, required: true },
    pointsType: { type: String, required: true },
    reason: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const ActionLogModel = mongoose.model('ActionLog', ActionLogSchema);

export const getAllActionLogs = () => ActionLogModel.find();
export const addNewActionLog = (actionLog: ActionLog) => new ActionLogModel(actionLog).save().then((actionLog) => actionLog.toObject());
export const getActionLogsForUser = (userId: string) => ActionLogModel.find({ userId }).exec();