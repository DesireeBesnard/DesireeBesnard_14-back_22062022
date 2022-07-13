import mongoose from 'mongoose'

const HRSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const hr = mongoose.model('HR', HRSchema)

export default hr