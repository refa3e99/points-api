import express from 'express';
import { getAllEmployees, addNewEmployee, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employees';
import { isAdmin, isAuthenticated } from '../middlewares';
import { addPoints } from '../controllers/points';

export default (router: express.Router) => {
    router.get('/employees', getAllEmployees);
    router.post('/employees', isAuthenticated, isAdmin, addNewEmployee);
    router.get('/employees/:id', getEmployee);
    router.patch('/employees/:id', isAuthenticated, isAdmin, updateEmployee);
    router.delete('/employees/:id', isAuthenticated, isAdmin, deleteEmployee);
    router.post('/employees/addPoints', isAuthenticated, isAdmin, addPoints);
}