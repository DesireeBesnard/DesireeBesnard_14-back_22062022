import { Router } from 'express'
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware.js'
import { AuthenticationController } from "../controllers/authentication.controller.js"
const router = Router()
const authenticationMiddleware = AuthenticationMiddleware.getInstance()
const authenticationController = AuthenticationController.getInstance()


router.post('/user/register', [
    authenticationMiddleware.register,
    authenticationController.register
])

router.post('/user/login', [
    authenticationMiddleware.login
])

//router.post('/user/logout')

export default router