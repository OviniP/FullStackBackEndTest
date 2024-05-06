const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getUserByToken = async (request, response) => {
  if(request.token === undefined || request.token === null || request.token === ''){
    return response.status(401).json({ error: 'token invalid' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    return user
}

  blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
                          .populate('user')
    response.json(result)
  })

  blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = new Blog(request.body)

    if(blog.likes == undefined){
      blog.likes = 0
    }
    if(blog.title == undefined || blog.url == undefined ||
      blog.title == '' || blog.url == ''){
      return response.status(404).end()
    }

    blog.user = user.id
    const result = await (await blog.save()).populate('user')

    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  })

  blogsRouter.post('/:id/comments', async(request, response) => {
    const comment = {"text":"text 1 comment"}
    const blogId = request.params.id
    let updatedBlog

    try{
       updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { comments: comment } },
        { new: true } // Return the updated document after the update
      ).populate('user');
    }
    catch(error)
    {
      console.log(error)
    }
    

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlog)
  })

  blogsRouter.get('/:id', async(request, response) => {
    const result = await Blog.findById(request.params.id)
                            .populate('user')
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })

  blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
    const user = request.user
    const result = await Blog.findById(request.params.id)
    if(user.id.toString() === result.user.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
    else{
      return response.status(401).json({ error: 'permission denied' })
    }
  })

  blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const blog = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id,  request.body, { new: true })
                              .populate('user')
    response.json(result)
  })

  
module.exports = blogsRouter