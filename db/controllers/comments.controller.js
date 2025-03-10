const { queryInsertComment } = require('../models/comments.model')

function postCommentOnArticleId(req, res) {
    const { article_id } = req.params
    const { username, body } = req.body

    queryInsertComment(article_id, body, username).then((row) => {
        console.log(row)
        res.status(200).send({comment: row})
    })
}

module.exports = { postCommentOnArticleId }