import mongoose, { Schema } from "mongoose";

const ActionLogSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, enum: ['ADD', 'DELETE'], required: true },
    points: { type: Number, required: true },
    reason: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const ActionLogModel = mongoose.model('ActionLog', ActionLogSchema);

export const getAllActionLogs = () => ActionLogModel.find();
export const addNewActionLog = (values: Record<string, any>) => new ActionLogModel(values).save().then((actionLog) => actionLog.toObject());
export const getActionLogsForUser = (userId: string) => ActionLogModel.find({userId}).exec();