import jwt from "jsonwebtoken"
import employee from "../models/Employee.js"


const refreshTokenArray = []

export class TokenMiddleware {
    
    static instance

    static getInstance() {
        if(!TokenMiddleware.instance) {
            TokenMiddleware.instance = new TokenMiddleware()
        }
        return TokenMiddleware.instance
    }

    checkToken(req, res, next) {
        const authcookie = req.cookies.authcookie
        const authHeader = req.headers.authorization

    
        try {
            if ((!authcookie)&&(!authHeader)) {
                return res.status(401).send("Token required")
            }
            
            if((authcookie)&&(!authHeader)) {
                jwt.verify(authcookie,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
                    if(err){
                        res.sendStatus(401).send("Invalid signature")
                    } else {
                        req.user = user
                    }
                })
            }

            if((!authcookie)&&(authHeader)) { 
                const token = authHeader.split(' ')[1]
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)  => {
                    if(err) {
                        res.status(403).send("Invalid token")
                    } else {
                        req.user = user
                    }
                })
            }
            next()
        } catch {
            res.status(401).send("Invalid token")
        }
    }

    getAccessToken(user) {
        return jwt.sign({ userId: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    }
    
    getRefreshAccessToken(user) {
        return jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.REFRESH_TOKEN_SECRET)
    }
    
    async getNewToken(req, res, next) {
        const token = req.body

        if(!token) {
            return res.status(401).send("token required")
        }

        const tokenOwner = employee.findOne({refreshTokens: token})
        if(!tokenOwner) {
            return res.status(403).send("Token expired")
        }

        //new access token
    
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {
                    return res.status(403).send("Invalid token")
                }

                const accessToken = this.getAccessToken(user)
                const refresh_token = this.getRefreshAccessToken(user)
                req.userId = user._id
                req.token = token
                req.refreshToken = refresh_token
                res.status(200).send(accessToken)
            })
            next()

        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
    
}

