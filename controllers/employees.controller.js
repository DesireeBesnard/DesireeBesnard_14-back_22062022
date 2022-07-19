import { EmployeesService } from "../services/employees.services.js"
import mongoose from 'mongoose'


//controller appelle les différents services

export class EmployeesController {

    //contains routes implementation code

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesController.instance ) {
            EmployeesController.instance = new EmployeesController()
        }
        return EmployeesController.instance
    }

    async list(req, res) {
        const employees = await EmployeesService.getInstance().list()
        res.status(200).send(employees)
    }

    async createEmployee(req, res) {
        console.log('creating employee')

        const employee = await EmployeesService.getInstance().create(req.body)

        res.status(200).send(employee)
    }

    async update(req, res) {

        const updateEmployee = await EmployeesService.getInstance().update(req.body, req.params.id)
        res.status(200).send(updateEmployee)
    }

    async updateAdminStatus(req, res) {
        res.send("Status updated")
    }

    async delete(req, res) {

        try {
            const deleteEmployee = await EmployeesService.getInstance().delete(req.params.id)
            res.status(200).send(deleteEmployee)
        } catch (error) {
            res.status(500).send(error)
        }

    }
}