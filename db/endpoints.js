const express = require('express')
const endpoints = require('../endpoints.json')
const app = express()
const { internalServerError } = require('./errors/first-error-change-name')
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleComments } = require('./controllers/articles.controller')
const { postCommentOnArticleId } = require('./controllers/comments.controller')

app.use(express.json())

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: endpoints})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:id', getArticles)

app.get('/api/articles/:id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', postCommentOnArticleId)

app.use(internalServerError)

module.exports = app;