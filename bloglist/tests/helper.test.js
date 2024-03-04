const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testData = require('./test_data')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () =>
{
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,0)
    })

    test('when list has only one blog equals the likes of total', () => {
        const [oneBlog] = testData.blogs
        const result = listHelper.totalLikes([oneBlog])
        assert.strictEqual(result,7)
    })

    test('of a blogger list is calculated right', () => {
        const result = listHelper.totalLikes(testData.blogs)
        assert.strictEqual(result,36)
    })
})

describe('favorite Blog',() => {
    test('empty list returns empty json', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {})
    })

   test('one blog returns right object', () => {
        const expected = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        }
        const result = listHelper.favoriteBlog([testData.blogs[0]])
        assert.deepStrictEqual(result,expected)
    })

    test('blog list returns right object', () => {
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        const result = listHelper.favoriteBlog(testData.blogs)
        assert.deepStrictEqual(result,expected)
    })
})
