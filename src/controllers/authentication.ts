import express from "express";
import { authentication, random } from "../helpers";

import { createUser, getUserByEmail, getUserByUsername } from "../db/users";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) return res.status(400).json({ error: "Username or password is incorrect." });

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash) return res.status(400).json({ error: "Username or password is incorrect." });

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();
        res.cookie('AUTH', user.authentication.sessionToken);
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const register = async (req: express.Request, res: express.Response) => {

    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return
        }

        const existingEmail = await getUserByEmail(email)

        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists." });
        }

        const existingUsername = await getUserByUsername(username)

        if (existingUsername) {
            return res.status(409).json({ error: "Username is already taken." });
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}