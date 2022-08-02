import { check } from 'express-validator'
import bcrypt from 'bcryptjs'
import { EmployeesController } from "../controllers/employees.controller.js"
const employeesController = EmployeesController.getInstance()
import employee from '../models/Employee.js'
import { request } from 'express'


export class EmployeesMiddleware {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesMiddleware.instance ) {
            EmployeesMiddleware.instance = new EmployeesMiddleware()
        }
        return EmployeesMiddleware.instance
    }

    async validateNewEmployee(req, res, next) {

        check('firstname')
            .trim()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage('Please fill the firstname field')

        check('lastname').trim()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage('Please fill the lastname field')

        check('dateOfBirth').trim()
            .notEmpty()
            .withMessage('Please fill the date of birth field')

        check('startDate').trim()
            .notEmpty()
            .withMessage('Please fill the start date field')

        check('department').trim()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage('Please fill the department field')

        check('street').trim()
            .notEmpty()
            .withMessage('Please fill the street field')

        check('city').trim()
            .notEmpty()
            .withMessage('Please fill the city field')
            
        check('zipCode').trim()
            .notEmpty()
            .withMessage('Please fill the zipCode field')


       const salt = await bcrypt.genSalt(10)
       req.body.password = await bcrypt.hash(req.body.password, salt)

        next()

    }

    async checkOwnership(req, res, next) {
        const user = req.user
        const target = await employee.findOne({ _id: req.body.id })

        if(target._id !== user.userId) {
            res.send(403).send("Only owner authorized")
        } else {
            res.send(200)
            next()
        }

    }

    async checkAdminStatus(req, res, next) {
        const user = req.user

        if(user.isAdmin) {
            next()
        } else {
            res.status(403).send("Admin status required")
        }
    }

    async getAdminTarget(req, res, next) {
        const target = await employee.findById(req.params.id)
        
        if(!target) {
            res.status(404).send("Unkown user")
        }

        req.targetStatus = target.isAdmin
        next()
    }

}