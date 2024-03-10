const usersRouter = require('express').Router()
const { request } = require('express')
const User = require('../models/user')
const bcypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {


    const {userName, name, password} = request.body 
    if(userName === undefined || userName.length <= 3){
        return response.status(400).json({error:'userName should be more than 3 characters'})
    }
    if(password === undefined || password.length <= 3){
        return response.status(400).json({error:'password should be more than 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcypt.hash(password,saltRounds)
    const user = new User({userName, passwordHash, name})
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
                        .populate('blogs')
    response.status(200).json(users)
})

module.exports = usersRouter