import { Employee, Points } from '../models/Employee';
import { deleteEmployeeById, getEmployees, getEmployeeById, createEmployee } from '../db/employees';
import express from 'express';

export const getAllEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await getEmployees();
        return res.status(200).json(employees);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const addNewEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const { name, title, points } = req.body;

        const employee: Employee = new Employee(name, title, points);
        const newEmployee = await createEmployee(employee);

        return res.status(200).json({ message: `Added employee ${newEmployee.name} successfully.` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const getEmployee = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;
        const employee = await getEmployeeById(id);
        return res.status(200).json(employee);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }

}

export const updateEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, title, points } = req.body;

        const employee: Employee = new Employee(name, title, points);
        const updatedEmployee = await getEmployeeById(id);

        if (name !== "") {
            updatedEmployee.name = employee.name;
        }

        if (title !== "") {
            updatedEmployee.title = employee.title;
        }

        if (points?.negativePoints !== 0 && points?.positivePoints) {
            updatedEmployee.points = employee.points;
        }

        await updatedEmployee.save();

        return res.status(200).json({ message: `Updated user ${updatedEmployee.name} successfully.` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const deleteEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await deleteEmployeeById(id);
        return res.status(200).json({ message: `Deleted user ${deletedEmployee.name} successfully.` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}