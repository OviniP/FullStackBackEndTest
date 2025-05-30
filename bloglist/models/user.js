const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        minLength:3,
        unique: true
    },
    passwordHash:{
        type:String,
        required:true,
        minLength:3
    },
    name:String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)