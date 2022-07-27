import { AuthenticationService } from '../services/authentication.service.js'


export class AuthenticationController {
    
    static instance

    static getInstance() {
        if (!AuthenticationController.instance) {
            AuthenticationController.instance = new AuthenticationController() 
        }
        return AuthenticationController.instance
    }

    async register(req, res) {
        const newUser = await AuthenticationService.getInstance().register(req.body)
        res.status(200).send(newUser)
    }

    async login(req, res) {
        const refreshToken = await AuthenticationService.getInstance().login(req.userId, req.refreshToken)
        res.status(200).send({token: req.token, refreshToken: req.refreshToken})
    }
    
}