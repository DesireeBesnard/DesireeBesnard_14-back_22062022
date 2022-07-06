import express from 'express';
import ('./database/index.js')
import bodyParser from 'body-parser'
import employees from './routes/employees.routes.js'
import common from './routes/employees.routes.js'
const port = 3001


// Create express app
const app = express()

//Middleware
app.use(bodyParser.json())
//faire un groupe pour éviter de tout taper
app.use('/', common)
app.use('/api/v1', employees)


// Starting server
app.listen(port, console.log("Listening on port 3001"))