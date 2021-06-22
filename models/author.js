const mongoose = require('mongoose')

// author schema is like a table in sql
// keys are like columns in sql
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AuthorModel', authorSchema)