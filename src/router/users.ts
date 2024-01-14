import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isAdminOrOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id',isAuthenticated, isAdminOrOwner, deleteUser);
    router.patch('/users/:id',isAuthenticated, isAdminOrOwner, updateUser);
}