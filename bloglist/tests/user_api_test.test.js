const {test,describe, only,beforeEach,after} = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = testHelper.initializeUsers
                            .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

//describe('POST',() => {
    test('When user is correct, then it should be saved', async() => {
        const userToCreate = {
            userName: 'ovini',
            password : 'ovini123',
            name: 'Ovini P'
        }
        const initialUsersInDB =  await testHelper.usersInDb()
        const response = await api.post('/api/users')
                                .send(userToCreate)
                                .expect(201)
        const finalUsersInDB =  await testHelper.usersInDb()
        assert.strictEqual(finalUsersInDB.length , initialUsersInDB.length + 1)
    })

    test('When userName is not given, then correct error should be shown', async() => {
        const userToCreate = {
            password : 'ovini123',
            name: 'Ovini P'
        }

        const response = await api.post('/api/users')
                                .send(userToCreate)
                                .expect(400)
        assert(response.body.error.includes('userName should be more than 3 characters'))
    })

    test('When password is not given, then correct error should be shown', async() => {
        const userToCreate = {
            userName:'Ovini',
            name: 'Ovini P'
        }

        const response = await api.post('/api/users')
                                .send(userToCreate)
                                .expect(400)
        assert(response.body.error.includes('password should be more than 3 characters'))
    })

    test('When userName is not 3 characters, then correct error should be shown', async() => {
        const userToCreate = {
            userName: 'ov',
            password : 'ovini123',
            name: 'Ovini P'
        }

        const response = await api.post('/api/users')
                                .send(userToCreate)
                                .expect(400)
        assert(response.body.error.includes('userName should be more than 3 characters'))
    })

    test('When password is not 3 characters, then correct error should be shown', async() => {
        const userToCreate = {
            userName:'Ovini',
            password:'12',
            name: 'Ovini P'
        }

        const response = await api.post('/api/users')
                                .send(userToCreate)
                                .expect(400)
        assert(response.body.error.includes('password should be more than 3 characters'))
    })

    test.only('when userName duplicated, then correct error message is shown', async() => {
        const userToAdd = {
            userName:'Ovini',
            password:'1234',
            name:'ABC'
        }

        const response = await api.post('/api/users')
                            .send(userToAdd)
                            .expect(400)

        assert(response.body.error.includes('expeced userName to be to be unique'))
    })
//})

after(async() => {
    mongoose.connection.close()
})