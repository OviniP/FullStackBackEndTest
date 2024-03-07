const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
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

    const result = await blog.save()
    response.status(201).json(result)
  })

  blogsRouter.get('/:id', async(request, response) => {
    const result = await blog.findById(request.params.id)
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })
module.exports = blogsRouter