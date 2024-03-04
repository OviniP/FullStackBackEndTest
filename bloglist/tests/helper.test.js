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

describe('most blogs', () => {
    test('list should return the right object', () => {
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
          }
        const result = listHelper.mostBlogs(testData.blogs)
        assert.deepStrictEqual(result, expected)
    })

    test('returns empty object with no data in the input list', () => {
        const expected = {}
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, expected)
    })

    test('returns blogs count 1 with author when one object in the input', () => {
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        const result = listHelper.mostBlogs([testData.blogs[0]])
        assert.deepStrictEqual(result, expected)
    })

    test('returns one object when two authors has the same max blog count', () => {
        const newBlog = {
            _id: "5a422aa71b54a676234d17f2",
            title: "Go To Statement Considered Harmful1",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          }

        const expected1 = {
            author: "Edsger W. Dijkstra",
            blogs: 3
        }

        const expected2 = {
            author: "Robert C. Martin",
            blogs: 3
        }
        const blogData = testData.blogs.slice()
        blogData.push(newBlog)
        const result = listHelper.mostBlogs(blogData)

        if (
            (result.author === expected1.author && result.blogs === expected1.blogs) ||
            (result.author === expected2.author && result.blogs === expected2.blogs)
        ) {
            assert.ok(true);
        } else {
            // Test failed
            assert.fail(`Result (${result.author}, ${result.blogs}) does not match expected1 (${expected1.author}, ${expected1.blogs}) or expected2 (${expected2.author}, ${expected2.blogs})`);
        }
    })
})

describe('Most Likes',() => {
    test('list should return the right object', () => {
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
          }
        const result = listHelper.mostLikes(testData.blogs)
        assert.deepStrictEqual(result, expected)
    })

    test('returns empty object with no data in the input list', () => {
        const expected = {}
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, expected)
    })

    test('returns the likes of given object when one object is in the input', () => {
        const expected = {
            author: "Michael Chan",
            likes: 7
        }
        const result = listHelper.mostLikes([testData.blogs[0]])
        assert.deepStrictEqual(result, expected)
    })
})