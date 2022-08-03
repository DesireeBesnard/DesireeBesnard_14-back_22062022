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
    employeesMiddleware.checkAdminStatus,
    employeesMiddleware.validateNewEmployee,
    employeesController.createEmployee
])

router.put('/employees/:id', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkOwnership,
    employeesController.update
])

router.put('/employees/:id/follow', [
    tokenMiddleware.checkToken,
    employeesController.follow
])

router.put('/employees/:id/unfollow', [
    tokenMiddleware.checkToken,
    employeesController.unfollow
])

router.put('/employees/:id/admin', [
    tokenMiddleware.checkToken,
    employeesMiddleware.checkAdminStatus,
    employeesMiddleware.getAdminTarget,
    employeesController.updateAdminStatus
])

router.delete('/employees/:id', [
    tokenMiddleware.checkToken,
    //employeesController.delete
])

export default router

