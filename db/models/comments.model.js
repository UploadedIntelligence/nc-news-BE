const db = require('../connection')

function queryInsertComment(article_id, comment_body, username) {
    const queryStr = `INSERT INTO comments(article_id, body, author) 
                VALUES($1, $2, $3) 
                RETURNING *`

    return db.query(queryStr, [article_id, comment_body, username]).then(({ rows }) => rows[0])
}

module.exports = { queryInsertComment }