import { EmployeesService } from "../services/employees.services.js"

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
}