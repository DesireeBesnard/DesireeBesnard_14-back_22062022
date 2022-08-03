import { EmployeesService } from "../services/employees.services.js"
import { mongoose } from "mongoose"

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

        res.status(201).send(employee)
    }

    async update(req, res) {

        const updateEmployee = await EmployeesService.getInstance().update(req.body, req.params.id)
        res.status(200).send(updateEmployee)
    }

    async updateAdminStatus(req, res) {

        const updatedStatus = await EmployeesService.getInstance().updateAdminStatus(req.params.id, req.targetStatus)
        res.status(200).send(updatedStatus)
    }

    async follow(req, res) {
        const follow = await EmployeesService.getInstance().follow(req.body.followId, req.user.userId)
        res.status(200).send(follow)
    }

    async unfollow(req, res) {
        const unfollow = await EmployeesService.getInstance().unfollow(req.body.followId, req.user.userId)
        res.status(200).send(unfollow)
    }

    async delete(req, res) {

        try {
            const deleteEmployee = await EmployeesService.getInstance().delete(req.params.id)
            //res.status(200).send(deleteEmployee)
        } catch (error) {
            res.status(500).send(error)
        }

    }
}