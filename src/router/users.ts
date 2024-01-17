import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isAdminOrOwner, isAdmin } from '../middlewares';
import { getAllEmployees } from '../controllers/employees';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, isAdmin, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isAdminOrOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isAdminOrOwner, updateUser);
}