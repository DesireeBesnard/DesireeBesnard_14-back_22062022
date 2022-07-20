import express from 'express';
import ('./database/index.js')
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authentication from './routes/authentication.routes.js'
import employees from './routes/employees.routes.js'
import common from './routes/employees.routes.js'
const port = 3001
dotenv.config()

// Create express app
const app = express()

//Middleware
app.use(bodyParser.json())
app.use(cookieParser())
//faire un groupe pour éviter de tout taper
app.use('/', common)
app.use('/api/v1', authentication)
app.use('/api/v1', employees)


// Starting server
app.listen(port, console.log("Listening on port 3001"))