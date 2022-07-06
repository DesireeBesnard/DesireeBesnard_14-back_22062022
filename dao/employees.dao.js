import Employee from '../models/Employee.js'

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

}