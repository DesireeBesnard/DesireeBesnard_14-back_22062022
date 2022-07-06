import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/hrnetDB')
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected to MongoDB database")
})