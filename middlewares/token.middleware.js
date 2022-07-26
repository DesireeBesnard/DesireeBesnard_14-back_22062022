import jwt from "jsonwebtoken"
import RefreshToken from "../models/RefreshToken.js"


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
        //const authcookie = req.cookies.authcookie
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            res.status(401).send("Token required")
        }
    
        try {
            /* if(authcookie) {
                jwt.verify(authcookie,"secret_key",(err,data) => {
                    if(err){
                        res.sendStatus(401)
                    } else if(data.userId){
                        req.userId = data.userId
                        next()
                    }
                })
            } else */
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)  => {
                if(err) {
                    res.status(403).send("Invalid token")
                }

                req.user = user
                next()
            })
        } catch {
            res.status(401).send("Invalid token")
        }
    }

    getAccessToken(user) {
        return jwt.sign({ userId: user._id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    }
    
    getRefreshAccessToken(id) {
        return jwt.sign({userId: id}, process.env.REFRESH_TOKEN_SECRET)
    }
    
    async getNewToken(req, res, next) {
        const refreshToken = req.body.refreshToken

        if(!refreshToken) {
            res.status(401).send("token required")
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if(!decode) {
            res.status(403).send("Invalid token")
        }

        //new access token
    
        try {
            const userId = decode.userId

            const findToken = await RefreshToken.findOne({token:refreshToken})
            if(!findToken) {
                res.status(403).send("Token expired")
            } else {

                const token = this.getAccessToken(userId)
                const refresh_Token = this.getRefreshAccessToken(userId)
                let newToken = await RefreshToken.findOneAndUpdate(
                    {token: refreshToken},
                    {token: refresh_Token},
                    {new: true}
                )
            }

            res.status(200).send({token: newToken, refreshToken: newRefreshToken})
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
    
}

