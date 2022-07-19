import { check } from 'express-validator'

export class EmployeesMiddleware {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesMiddleware.instance ) {
            EmployeesMiddleware.instance = new EmployeesMiddleware()
        }
        return EmployeesMiddleware.instance
    }

    validateNewEmployee(req, res, next) {

        console.log(req.body)

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

        next()

    }

    checkOwner(req, res, next) {
        console.log('I am the owner')
        next()
    }

    async checkAdmin(req, res, next) {
        const token = req.cookies.authcookie
        if(user.isAdmin) {
            next()
        } else {
            res.status(403).send
        }
    }
}