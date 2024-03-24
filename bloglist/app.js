const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
require('express-async-errors')
const blogsRouter = require('./controllers/Blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
console.log(mongoUrl)
mongoose.connect(mongoUrl)
.then(() => {
    logger.info('connected to the database.')
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}  
app.use('/api/blogs',blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
