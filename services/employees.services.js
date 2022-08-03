import { EmployeesDAO } from "../dao/employees.dao.js"

// service morceau de code qui permet de faire une logique. Une tâche par service

export class EmployeesService {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesService.instance ) {
            EmployeesService.instance = new EmployeesService()
        }
        return EmployeesService.instance
    }

    async list() {
        const employees = await EmployeesDAO.getInstance().list()
        return employees
    }

    async create(employee) {
        const newEmployee = await EmployeesDAO.getInstance().create(employee)
        return newEmployee
    }

    async update(employee, id) {
        const updatedEmployee = await EmployeesDAO.getInstance().update(employee, id)
        return updatedEmployee
    }

    async updateAdminStatus(id, targetStatus) {
        const updatedEmployee = await EmployeesDAO.getInstance().updateAdminStatus(id, targetStatus)
        return updatedEmployee
    }
    
    async follow(followId, userId) {
        const follow = await EmployeesDAO.getInstance().follow(followId, userId)
        return follow
    }

    async unfollow(followId, userId) {
        const unfollow = await EmployeesDAO.getInstance().unfollow(followId, userId)
        return unfollow
    }

    async delete(id) {
        const deleteEmployee = await EmployeesDAO.getInstance().delete(id)
        return deleteEmployee
    }

}