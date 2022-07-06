import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    startDate: String,
    department: String,
    street: String,
    city: String,
    zipCode: String
})

//module.exports = mongoose.model('Employee', EmployeeSchema)

const employee = mongoose.model('Employee', EmployeeSchema)

export default employee