const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
  })

blogsRouter.post('/', (request, response, next) => {
    const body = request.body
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    newBlog.save()
    .then(savedBlog => {
        response.json(savedBlog)
    })
    .catch(error => next())
})

blogsRouter.post('/:id/like', (request, response, next) => {
    Blog.findByIdAndUpdate(request.params.id, {$inc: {likes: 1}}, {new: true})
    .then(savedBlog => {
        response.json(savedBlog)
    })
    .catch(error => next())
})

module.exports = blogsRouter