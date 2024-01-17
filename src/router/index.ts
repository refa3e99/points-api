import express from "express";

import authentication from "./authentication";
import users from "./users";
import actionLogs from "./actionLogs";
import employees from "./employees";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    employees(router);
    actionLogs(router);
    
    return router;
};