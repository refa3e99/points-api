import mongoose from "mongoose";
import { createUser, getUserByEmail } from "./users";
import { authentication, random } from "../helpers";
import dotenc from 'dotenv';

dotenc.config();

export const seedData = async () => {
    try {
    const salt = random();

    const adminExists = await getUserByEmail("admin@admin.com");

    if (!adminExists) {
        const user = await createUser({
            email: "admin@admin.com",
            username: "admin",
            role: "admin",
            authentication: {
                salt,
                password: authentication(salt, process.env.DEFAULT_PASSWORD),
            },
        });
    }
    } catch (error) {
        console.log(error);
    }
}