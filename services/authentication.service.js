import { AuthenticationDAO } from "../dao/authentication.dao.js"

export class AuthenticationService {

    static instance

    static getInstance() {
        if( !AuthenticationService.instance ) {
            AuthenticationService.instance = new AuthenticationService()
        }
        return AuthenticationService.instance
    }

    async register(user) {
        const newUser = await AuthenticationDAO.getInstance().register(user)
        return newUser
    }

    async login(userId, token, refreshToken) {
        return await AuthenticationDAO.getInstance().login(userId, token, refreshToken)
 
    }
}