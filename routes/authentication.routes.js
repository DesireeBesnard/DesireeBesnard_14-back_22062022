import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication.controller.js'
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware.js'
const router = Router()
const authenticationController =  AuthenticationController.getInstance()
const authenticationMiddleware = AuthenticationMiddleware.getInstance()


router.post('/user/register', [
    authenticationMiddleware.register,
    authenticationController.register
])

router.post('user/login', [
    authenticationMiddleware.login  
])

export default router