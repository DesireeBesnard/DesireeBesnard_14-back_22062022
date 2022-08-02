import Employee from '../models/Employee.js'
import mongoose from 'mongoose'
let ObjectId = mongoose.Types.ObjectId

//DAO defines the standard operations to be performed on a model object.


export class EmployeesDAO {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesDAO.instance ) {
            EmployeesDAO.instance = new EmployeesDAO()
        }
        return EmployeesDAO.instance
    }

    async list() {
        const employees = await Employee.find()
        return employees 
    }

    async create(employee) {
        const newEmployee = new Employee(employee)
        const savedEmployee = await newEmployee.save()
        return savedEmployee
    }

    async update(employee, id) {
        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                employee
            )
            return updatedEmployee
        } catch (error) {
            console.log(error)
        }
    }

    async updateAdminStatus(id, targetStatus) {
        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                { isAdmin: !targetStatus},
                {returnDocument: 'after'}
            )
            return updatedEmployee
        } catch(error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            const deletedEmployee = await Employee.findByIdAndDelete(id)
            return deletedEmployee
        } catch (error) {
            throw "Je n'ai pas delete"
        }
    }
}