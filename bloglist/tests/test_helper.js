const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const response = await Blog.find({})
    return response.map(r => r.toJSON())
}

module.exports = {
    initializeBlogs,
    blogsInDb
}