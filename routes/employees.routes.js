import { Router } from 'express'
import { EmployeesController } from '../controllers/employees.controller.js'
import { EmployeesMiddleware } from '../middlewares/employees.middleware.js'
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { TokenMiddleware } from '../middlewares/token.middleware.js'
const router = Router()
const employeesMiddleware = EmployeesMiddleware.getInstance()
const authenticationMiddleware = AuthenticationMiddleware.getInstance()
const employeesController = EmployeesController.getInstance()
const tokenMiddleware = TokenMiddleware.getInstance()


//faire un diagramme de séquence: draw.io

//Get all routes
router.get('/employees', [
    tokenMiddleware.checkToken,
    employeesController.list
])


//Create a user
router.post('/employees', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkAdmin,
    employeesMiddleware.validateNewEmployee,
    employeesController.createEmployee
])

router.put('/employees/:id', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkOwner,
    employeesController.update
])

/*router.put('employees/:id/status', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkOwner,
    employeesController.update
])*/

router.put('employees/:id/admin', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkAdmin,
    employeesController.updateAdminStatus
])

router.delete('/employees/:id', [
    tokenMiddleware.checkToken,
    //employeesController.delete
])

export default router

