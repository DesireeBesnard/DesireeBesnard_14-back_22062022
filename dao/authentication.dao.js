import employee from "../models/Employee.js"

export class AuthenticationDAO {

    static instance

    static getInstance() {
        if( !AuthenticationDAO.instance ) {
            AuthenticationDAO.instance = new AuthenticationDAO()
        }
        return AuthenticationDAO.instance
    }

    async register(user) {
        const newUser = new employee(user)
        const savedUser = await newUser.save()
        return savedUser
    }
}