const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Create express app
const app = express()

//Database
mongoose.connect('mongodb://localhost/hrnetDB')
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected to MongoDB database")
})

//Middleware
app.use(bodyParser.json())

//Routes
app.get('/', (req, res) => {
    res.send("Hello world!")
})

const employees = require('./routes/employeesRoutes.js')
app.use('/api/v1/employees', employees)


// Starting server
app.listen(3001, console.log("Listening on port 3001"))