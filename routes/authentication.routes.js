import { Router } from 'express'
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware.js'
import { AuthenticationController } from "../controllers/authentication.controller.js"
import { TokenMiddleware } from '../middlewares/token.middleware.js'
const router = Router()
const authenticationMiddleware = AuthenticationMiddleware.getInstance()
const authenticationController = AuthenticationController.getInstance()
const tokenMiddleware = TokenMiddleware.getInstance()


router.post('/user/register', [
    authenticationMiddleware.register,
    authenticationController.register
])

router.post('/user/login', [
    authenticationMiddleware.login,
    authenticationController.login
])

router.post('/user/refreshToken', [
    tokenMiddleware.getNewToken
])

//router.post('/user/logout')

export default router