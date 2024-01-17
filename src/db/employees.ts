import { Employee } from "../models/Employee";
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    points: {
        negativePoints: {type: Number, default: 0},
        positivePoints: {type: Number, default: 0}
    }
});

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

export const getEmployees = () => EmployeeModel.find();
export const getEmployeeById = (id: string) => EmployeeModel.findById(id);
export const createEmployee = (newEmployee: Employee) => new EmployeeModel(newEmployee).save().then((employee) => employee.toObject());
// export const updateEmployeeById = (id: string, employee:Employee) => EmployeeModel.findByIdAndUpdate(id, employee);
export const deleteEmployeeById = (id: string) => EmployeeModel.findOneAndDelete({ _id: id });