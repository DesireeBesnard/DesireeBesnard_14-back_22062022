import jwt from "jsonwebtoken"

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
        const token = req.headers["x-access-token"]
    
        if (!token) {
            res.status(403).send("Token required")
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
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = decode
    
            next()
        } catch {
            res.status(401).send("Invalid token")
        }
    }

    getAccessToken(id) {
        return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    }
    
    getRefreshAccessToken(id) {
        return jwt.sign({userId: id}, process.env.REFRESH_TOKEN_SECRET)
    }
    
    getNewToken(req, res, next) {
        const refreshToken = req.body.refreshToken
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log('coucou1')
        if(!decode) {
            res.status(403).send("Invalid token")
        }
    
        const userId = decode.userId
        const newToken = this.getAccessToken(userId)
        const newRefreshToken = this.getRefreshAccessToken(userId)
        res.status(200).send({token: newToken, refreshToken: newRefreshToken})
    }
    
}

