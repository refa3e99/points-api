import express from 'express';

import { addActionLog, getActionLogForUser, getActionsLogs } from '../controllers/actionLogs';
import { isAdmin, isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/actionLogs', getActionsLogs);
    router.post('/actionLogs',isAuthenticated, isAdmin, addActionLog);
    router.get('/actionLogs/:id', getActionLogForUser);
}