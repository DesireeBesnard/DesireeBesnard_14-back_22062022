import { EmployeesDAO } from "../dao/employees.dao"


export class EmployeesService {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesService.instance ) {
            EmployeesService.instance = new EmployeesService()
        }
        return EmployeesService.instance
    }

    create(employee) {
        console.log("Employee service", employee)
        EmployeesDAO.getInstance().create(employee)
    }

}