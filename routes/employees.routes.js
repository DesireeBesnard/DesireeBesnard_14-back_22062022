import { Router } from 'express'
import { EmployeesController } from '../controllers/employees.controller.js'
import { EmployeesMiddleware } from '../middlewares/employees.middleware.js'
const router = Router()
const employeesMiddleware = EmployeesMiddleware.getInstance()
const employeesController = EmployeesController.getInstance()


//faire un diagramme de séquence: draw.io

//Get all routes
router.get('/employees', [
    employeesController.list
])


//Create a user
router.post('/employees', [
    employeesMiddleware.validateNewEmployee,
    employeesController.createEmployee
])

//ajouter put et delete
router.put('/employees/:id', [
    employeesController.update
])

router.delete('/employees/:id', [
    employeesController.delete
])

export default router

