const db = require('../connection')

function queryArticles(article_id, order_type = 'desc') {
    const regex = /^[0-9]+$/
    let queryStr = 'SELECT * FROM articles'
    const queryParams = [];

    if (regex.test(article_id)) {
        queryStr += ' WHERE article_id = $1'
        queryParams.push(article_id)
    } else if (article_id !== undefined) {
        return Promise.reject({status: 400, message: 'Invalid data type, please enter a number'})
    }

    queryStr += ` ORDER BY created_at ${order_type}`

    return db.query(queryStr, queryParams).then(({rows}) => rows)
}

function queryArticleComments(article_id, order_type = 'asc') {
    const regex = /^[0-9]+$/;
    let queryStr = 'SELECT * FROM comments'
    const queryParam = [];

    if (regex.test(article_id)) {
        queryStr += ` WHERE article_id = $1`
        queryParam.push(article_id)
    } else if (article_id !== undefined) {
        return Promise.reject({status: 400, message: 'Invalid data type, please enter a number'})
    }

    queryStr += ` ORDER BY created_at ${order_type}`
    console.log(queryStr)
    return db.query(queryStr, queryParam).then(({ rows }) => rows)
}

module.exports = {queryArticles, queryArticleComments}