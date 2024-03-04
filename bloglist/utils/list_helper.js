const lodash = require('lodash');

const dummy = (blogs) =>
{
    return 1
}

const totalLikes = (blogs) => {
    const sum =  blogs.reduce((acc,current) => {
        return acc + current.likes
    },0)
    return sum
}

const favoriteBlog = (blogs) => {
    if(!blogs || blogs.length === 0){
        return {}
    }

    const filtered = blogs.reduce((prev, current) => {
        
        return prev.likes > current.likes ? prev: current
    })
    
    return {
        title: filtered.title,
        author: filtered.author,
        likes: filtered.likes
    }
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0){
        return {}
    }
    const groupedData = lodash.groupBy(blogs, 'author');
    console.log(groupedData);

    const mapped = lodash.mapValues(groupedData,(o)=>{ return o.length})
    console.log(mapped);

    const pairWithLargestNumber = lodash.maxBy(lodash.toPairs(mapped), pair => pair[1]);
    console.log(pairWithLargestNumber);

    const object = lodash.zipObject(['author', 'blogs'], pairWithLargestNumber);
    console.log(object);

    return object
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0){
        return {}
    }

    const groupedData = lodash.groupBy(blogs, 'author');
    console.log(groupedData)

    const mapped = lodash.mapValues(groupedData,blog => lodash.sumBy(blog,'likes'))
    //console.log(mapped)

    const pairs = lodash.toPairs(mapped)
    //console.log(pairs)

    const max =lodash.maxBy(pairs, function(o) { return o[1]; });
    //console.log(max)

    const object = lodash.zipObject(['author', 'likes'], max);
    //console.log(object)
    return object
}

module.exports = 
{   
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}
