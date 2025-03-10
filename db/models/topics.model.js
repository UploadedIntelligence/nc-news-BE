const db = require('../connection')

function queryTopics() {
    let queryStr = 'SELECT * FROM topics';
    return db.query(queryStr).then(({ rows }) => rows)
}

module.exports = { queryTopics }