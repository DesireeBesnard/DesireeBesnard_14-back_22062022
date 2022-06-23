

export class EmployeesDAO {

    static instance 

    //singleton
    static getInstance() {
        if( !EmployeesDAO.instance ) {
            EmployeesDAO.instance = new EmployeesDAO()
        }
        return EmployeesDAO.instance
    }

    create(employee) {
        console.log("adding employee to database")
    }

}