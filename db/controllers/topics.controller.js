const { queryTopics } = require('../models/topics.model')

function getTopics(req, res) {
    return queryTopics().then((topics) => {
        res.status(200).send({ topics: topics})
    })
}

module.exports = { getTopics }