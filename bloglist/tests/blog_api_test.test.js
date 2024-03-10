const {test,after,beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initializeBlogs
                            .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('HTTP GET', () => {
    test.only('when get is called then 2 blogs are returned', async() => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(helper.initializeBlogs.length,response.body.length)
    })
    
    test('blog post contains id property', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        assert(blog.hasOwnProperty('id'))
    })
})

describe('HTTP POST', () => {
    test('when post method is called, then item is added to the db', async () => {
        const newBlog = {
            title: "New Blog by Test",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const returnedPosts = await helper.blogsInDb()
        assert.strictEqual(returnedPosts.length,helper.initializeBlogs.length + 1)
    })
    
    test('when post method is calld without like property, then default value 0 is added',async () => {
        const newBlog = {
            title: "Blog with no Likes",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
        }
        const createResponse = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const createdPost = createResponse.body
    
        const response = await api.get(`/api/blogs/${createdPost.id}`)
        const returnedPost = response.body
        assert.strictEqual(returnedPost.likes,0)
    })

    test('when like property has a value, then the value is saved',async () => {
        const newBlog = {
            title: "Blog with no Likes",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes:10
        }
        const createResponse = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const createdPost = createResponse.body
    
        const response = await api.get(`/api/blogs/${createdPost.id}`)
        const returnedPost = response.body
        assert.strictEqual(returnedPost.likes,10)
    })

    test('title attribute is missing, then 404 error occurs', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
        }

        const createResponse = await api.post('/api/blogs')
            .send(newBlog)
            .expect(404)

        const returnedPosts = await helper.blogsInDb()
        assert.strictEqual(returnedPosts.length,helper.initializeBlogs.length)
    })

    test('url attribute is missing, then 404 error occurs', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            title: "Blog with no Likes",
        }

        const createResponse = await api.post('/api/blogs')
            .send(newBlog)
            .expect(404)

        const returnedPosts = await helper.blogsInDb()
        assert.strictEqual(returnedPosts.length,helper.initializeBlogs.length)
    })

    test('if both title and url attributes is missing, then 404 error occurs', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            title: "Blog with no Likes",
        }

        const createResponse = await api.post('/api/blogs')
            .send(newBlog)
            .expect(404)

        const returnedPosts = await helper.blogsInDb()
        assert.strictEqual(returnedPosts.length,helper.initializeBlogs.length)
    })
})

describe('HTTP DELETE', () => {
    test('when deleted, then count will be reduced', async () => {
        const initialPosts = await helper.blogsInDb()
        const response = await api.delete(`/api/blogs/${initialPosts[0].id}`)
        const postAfterDelete = await helper.blogsInDb()

        assert.strictEqual(postAfterDelete.length,initialPosts.length - 1)
    })
})

describe('HTTP PUT', () => {
    test('when modified, then new object will be returned', async () => {
        const initialPosts = await helper.blogsInDb()
        const postToBeChanged = initialPosts[0]
        postToBeChanged.title = postToBeChanged.title + " Modified"
        const response = await api.put(`/api/blogs/${postToBeChanged.id}`).send(postToBeChanged)
        const postAfterChanged = await helper.blogsInDb()
        changedObj = postAfterChanged.find(post => post.id === postToBeChanged.id)
        assert.strictEqual(changedObj.title,postToBeChanged.title)
    })
})

after(async() => {
    mongoose.connection.close()
})