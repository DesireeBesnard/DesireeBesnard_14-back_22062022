import { AuthenticationService } from '../services/authentication.service.js'
import mongoose from 'mongoose'


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

    
}