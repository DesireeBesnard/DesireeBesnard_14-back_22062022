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
            if( (req.body.firstName === "") || (req.body.lastName === "") || (req.body.email === "") || (req.body.password === "") ) {
                res.status(404).send("Invalid form")
            } else if ((/\d/.test(req.body.firstName)) || (/\d/.test(req.body.lastName))) {
                res.status(404).send("Invalid form")
            } 
            next()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    login(req, res) {
        console.log(req.body)
        res.send('Login')
    }
}