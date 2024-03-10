const Blog = require('../models/blog')
const User = require('../models/user')

const initializeBlogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    }
]

const initializeUsers = [
    {
        userName:'Ovini',
        passwordHash:'8hee5whw6be8web',
        name:'ovini P'
    },
    {
        userName:'ABC123',
        passwordHash:'12Jf6he8deje6rhr',
        name:'ovini P'
    }
]

const blogsInDb = async () => {
    const response = await Blog.find({})
    return response.map(r => r.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
    initializeBlogs,
    initializeUsers,
    blogsInDb,
    usersInDb
}