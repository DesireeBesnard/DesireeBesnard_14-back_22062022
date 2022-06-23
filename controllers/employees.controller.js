import { EmployeesService } from "../services/employees.services"

export class EmployeesController {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesController.instance ) {
            EmployeesController.instance = new EmployeesController()
        }
        return EmployeesController.instance
    }

    createEmployee(req, res, next) {
        console.log('creating employee')

        EmployeesService.getInstance().create(req.body)

        res.status(200).send({
            message: "Success"
        })
    }
}