const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

  blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
                          .populate('user')
    response.json(result)
  })

  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    blog.title == undefined || blog.url == undefined
    if(blog.likes == undefined){
      blog.likes = 0
    }
    if(blog.title == undefined || blog.url == undefined){
      return response.status(404).end()
    }

    const createdUser = await User.findOne({})
    console.log(createdUser)
    blog.user = createdUser.id

    const result = await blog.save()

    createdUser.blogs = createdUser.blogs.concat(result._id)
    await createdUser.save()
    response.status(201).json(result)
  })

  blogsRouter.get('/:id', async(request, response) => {
    const result = await Blog.findById(request.params.id)
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })

  blogsRouter.delete('/:id', async(request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    console.log(request.body)
    const newobj = {likes:13}
    const result = await Blog.findByIdAndUpdate(request.params.id,  request.body, { new: true })
    console.log(result)
    response.json(result)
  })

  
module.exports = blogsRouter