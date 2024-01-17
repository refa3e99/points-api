import express from "express";

import { getActionLogsForUser, getAllActionLogs, addNewActionLog } from "../db/actionLogs";


export const getActionsLogs = async (req: express.Request, res: express.Response) => {
    try {
        const logs = await getAllActionLogs();
        return res.status(200).json(logs);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const addActionLog = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, actionType, points, reason } = req.body;

        const log = await addNewActionLog({
            userId,
            actionType,
            points,
            reason
        });

        return res.status(200).json(log);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const getActionLogForUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const logs = await getActionLogsForUser(id);
        return res.status(200).json(logs);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}