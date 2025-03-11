const { queryArticles, queryArticleComments } = require('../models/articles.model')

function getArticles(req, res, next) {
    const article_id = req.params.id
    const { order_by } = req.query

    queryArticles(article_id, order_by).then((articles) => {
        res.status(200).send({ articles: articles })
    })
}

function getArticleComments(req, res, next) {
    const article_id = req.params.id

    queryArticleComments(article_id).then((comments) => {
        res.status(200).send({comments: comments})
    })
}

module.exports = { getArticles, getArticleComments }