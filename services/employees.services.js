import { EmployeesDAO } from "../dao/employees.dao.js"


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

}