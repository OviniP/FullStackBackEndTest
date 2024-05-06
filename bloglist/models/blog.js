const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments:[
      {
        text: String, 
        date: { type: Date, default: Date.now } 
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  blogSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        returnedObject.comments = returnedObject.comments.map(comment => {
          const transformedComment = { ...comment }; // Convert Mongoose document to plain object
          transformedComment.id = transformedComment._id.toString(); // Convert _id to id
          delete transformedComment._id;
          return transformedComment;
        });
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)
  
