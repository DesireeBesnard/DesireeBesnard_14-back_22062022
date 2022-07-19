import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 2,
        required: true
    },
    lastName: {
        type: String,
        min: 2,
        required: true
    },
    dateOfBirth: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        min: 8,
        required: true
    },
    startDate: String,
    department: String,
    street: String,
    city: String,
    zipCode: String,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
})

const employee = mongoose.model('Employee', EmployeeSchema)

export default employee