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
        console.log('validating employee')
        next()
    }
}