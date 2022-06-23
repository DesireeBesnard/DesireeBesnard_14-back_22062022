import { Router } from 'express'
import { EmployeesController } from '../controllers/employees.controller'
import { EmployeesMiddleware } from '../middlewares/employees.middleware'
const router = Router()
const employeesMiddleware = EmployeesMiddleware.getInstance()
const employeesController = EmployeesController.getInstance()



//Get all routes
router.get('/employees', async (req, res) => {
    const employees = await Employee.find()

    res.json(employees)
})


//Create a user
router.post('/employees', [
    employeesMiddleware.validateNewEmployee,
    employeesController.createEmployee
])


export default router

