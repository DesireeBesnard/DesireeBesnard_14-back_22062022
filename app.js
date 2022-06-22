const express = require('express')
const mongoose = require('mongoose')

// Create express app
const app = express()

//Database
mongoose.connect('mongodb://localhost/hrnetDB')
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected to MongoDB database")
})

//Routes
app.get('/', (req, res) => {
    res.send("Hello world!")
})


// Starting server
app.listen(3001, console.log("Listening on port 3001"))