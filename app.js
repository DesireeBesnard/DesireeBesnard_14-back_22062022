const express = require('express')
require('./database/index.js')
const bodyParser = require('body-parser')
const employees = require('./routes/employees.routes.js').default
const common = require('./routes/common.routes.js')


// Create express app
const app = express()

//Middleware
app.use(bodyParser.json())

//faire un groupe pour éviter de tout taper
app.use('/api/v1', employees)
app.use('/', common)


// Starting server
app.listen(3001, console.log("Listening on port 3001"))