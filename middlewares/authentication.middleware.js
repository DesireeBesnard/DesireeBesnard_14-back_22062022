import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import employee from "../models/Employee.js"
import bcrypt from 'bcryptjs'


export class AuthenticationMiddleware {
    
    static instance

    static getInstance() {
        if( !AuthenticationMiddleware.instance ) {
            AuthenticationMiddleware.instance = new AuthenticationMiddleware()
        }
        return AuthenticationMiddleware.instance
    }

    register(req, res, next) {
        try {
            if((!req.body.firstName) || (!req.body.lastName) || (!req.body.email) || (!req.body.password)){
                res.status(400).send("Invalide form")
            }
            if( (req.body.firstName === "") || (req.body.lastName === "") || (req.body.email === "") || (req.body.password === "") ) {
                res.status(400).send("Invalid form")
            } else if ((/\d/.test(req.body.firstName)) || (/\d/.test(req.body.lastName))) {
                res.status(400).send("Invalid form")
            } 
            next()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    checkToken (req, res, next) {
        const authcookie = req.cookies.authcookie
        
        jwt.verify(authcookie,"secret_key",(err,data) => {
            if(err){
                res.sendStatus(403)
            } 
            else if(data.user){
                req.user = data.user
                next()
            }
        })
    }

    async login(req, res, next) {
 
        try {

            if((req.body.email.length === 0) || (req.body.password.length === 0)) {
                res.status(400).send("Incomplete form")
            }
            //check if user exists
            const user = await employee.findOne( {email: req.body.email} )
            if(!user) {
                res.status(404).send("Unkown user")
            }

            //check password
            const validPwd = await bcrypt.compare(req.body.password, user.password)
            if(!validPwd) {
                res.status(401).send("Wrong password")
            }

           /* const token = jwt.sign({user:user.email},'secret_key')
            res.cookie('authcookie',token,{maxTime:90000,httpOnly:true}) */
            res.send(user)
            console("Successful authentication")
   
        } catch (error) {
            res.status(500)
        }
        next()

    }

}