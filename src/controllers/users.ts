import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../db/users';
import { getEmployees } from '../db/employees';

export const getAllEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await getEmployees();
        return res.status(200).json(employees);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.status(200).json({ message: `Deleted user ${deletedUser.username} successfully.` });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.username = username;
        await user.save();

        return res.status(200).json({ message: `Updated user ${user.username} successfully.` });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// export const addPointsToUser = async (req: express.Request, res: express.Response) => {
//     try {
//         const { id, positivePoints, negativePoints } = req.body;

//         if (!id || isNaN(Number(positivePoints)) || isNaN(Number(negativePoints))) {
//             return res.status(400).json({ error: "Invalid input data." });
//         }

//         if (Number(positivePoints) === 0 || Number(negativePoints) === 0) {
//             return res.status(400).json({ error: "PositivePoints and NegativePoints should be non-zero." });
//         }

//         const user = await getUserById(id);

//         if ('positivePoints' in user.points) {
//             user.points.positive = positivePoints;
//         }

//         if ('negativePoints' in user.points) {
//             user.points.negative = negativePoints;
//         }

//         await user.save();

//         return res.status(200).json({ message: "Points added successfully." });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "An error occurred while adding points." });
//     }
// }