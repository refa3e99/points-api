import express from 'express';

import { addNewActionLog } from '../db/actionLogs';
import { getEmployeeById } from '../db/employees';
import { ActionLog } from '../models/ActionLog';

export const addPoints = async (req: express.Request, res: express.Response) => {
    try {
        const { id, positivePoints, negativePoints, reason } = req.body;

        if (!id || isNaN(Number(positivePoints)) || isNaN(Number(negativePoints))) {
            return res.status(400).json({ error: "Invalid input data." });
        }

        if (Number(positivePoints) === 0 && Number(negativePoints) === 0) {
            return res.status(400).json({ error: "PositivePoints and NegativePoints should be non-zero." });
        }

        const employee = await getEmployeeById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        employee.points.positivePoints += +positivePoints;
        employee.points.negativePoints += +negativePoints;

        await employee.save();

        if (positivePoints != 0) {
            await addNewActionLog(new ActionLog(
                id,
                positivePoints > 0 ? 'ADD' : 'DELETE',
                positivePoints,
                'POSITIVE',
                reason
            ));
        }

        if (negativePoints != 0) {
            await addNewActionLog(new ActionLog(
                id,
                negativePoints > 0 ? 'ADD' : 'DELETE',
                negativePoints,
                'NEGATIVE',
                reason
            ));
        }

        return res.status(200).json({ message: "Points added successfully." });


    } catch (error) {
        console.log(error);
    }
}