import express from "express";

import {isAuthenticated, login, register} from "../controllers/authentication";

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/isAuthenticated', isAuthenticated);
};