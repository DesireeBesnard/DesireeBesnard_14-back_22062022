import employee from "../models/Employee.js"
import jwt from "jsonwebtoken"
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
            const user = await employee.findOne({email:req.body.email})
            if(!user) {
                res.status(404).send("Unkown user")
            }

            //check password
            const validPwd = await bcrypt.compare(req.body.password, user.password)
            !validPwd && res.status(400).send("Wrong password")

            //jwt.sign(payload, secretOrPrivateKey, [options, callback]))
            const token = jwt.sign({userId:user._id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})

            res.cookie('authcookie',token,{maxTime:900000,httpOnly:true})
            console.log("Successful authentication")
            res.status(200).send(user)
            

        } catch (error) {
            res.status(500)
        }
        next()

    }

}