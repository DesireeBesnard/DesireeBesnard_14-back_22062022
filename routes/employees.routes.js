import { Router } from 'express'
import { EmployeesController } from '../controllers/employees.controller.js'
import { EmployeesMiddleware } from '../middlewares/employees.middleware.js'
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware.js"
const router = Router()
const employeesMiddleware = EmployeesMiddleware.getInstance()
const authenticationMiddleware = AuthenticationMiddleware.getInstance()
const employeesController = EmployeesController.getInstance()


//faire un diagramme de séquence: draw.io

//Get all routes
router.get('/employees', [
    employeesController.list
])


//Create a user
router.post('/employees', [
    //authenticationMiddleware.checkToken,
    employeesMiddleware.validateNewEmployee,
    employeesController.createEmployee
])

router.put('/employees/:id', [
    authenticationMiddleware.checkToken,
    employeesMiddleware.checkOwner,
    employeesController.update
])

router.put('employees/:id/admin', [
    authenticationMiddleware.checkToken,
    employeesMiddleware.checkAdmin,
    employeesController.updateAdminStatus
])

router.delete('/employees/:id', [
    authenticationMiddleware.checkToken,
    //employeesController.delete
])

export default router

