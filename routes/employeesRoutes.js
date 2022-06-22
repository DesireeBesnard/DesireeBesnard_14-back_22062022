const express = require('express')
const router = express.Router()
const Employee =  require('../models/Employee')

//Get all routes
router.get('/', (req, res) => {
    res.send('Get all routes')
})


//Create a user
router.post('/new', async (req, res) => {
    const newEmployee = new Employee(req.body)

    const savedEmployee = await newEmployee.save()
    res.json(savedEmployee)
})

module.exports = router