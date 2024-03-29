import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

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
        required: true
    },
    password: {
        type: String,
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
    token: {
        type: Array,
        default: []
    },
    refreshTokens: {
        type: Array,
        default: []
    },
    followers: [{type:ObjectId, ref:'Employee'}],
    followings: [{type:ObjectId, ref:'Employee'}]
})

const employee = mongoose.model('Employee', EmployeeSchema)

export default employee