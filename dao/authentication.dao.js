import HR from '../models/HR.js'

export class AuthenticationDAO {

    static instance

    static getInstance() {
        if( !AuthenticationDAO.instance ) {
            AuthenticationDAO.instance = new AuthenticationDAO()
        }
        return AuthenticationDAO.instance
    }

    async register(user) {
        const newUser = new HR(user)
        const savedUser = await newUser.save()
        return savedUser
    }
}