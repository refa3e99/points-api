import express from 'express';
import { getActionLogForUser, getActionsLogs } from '../controllers/actionLogs';

export default (router: express.Router) => {
    router.get('/actionLogs', getActionsLogs);
    // router.post('/actionLogs',isAuthenticated, isAdmin, addActionLog);
    router.get('/actionLogs/:id', getActionLogForUser);
}