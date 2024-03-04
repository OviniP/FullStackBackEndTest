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

module.exports = 
{   
    dummy, 
    totalLikes, 
    favoriteBlog
}
