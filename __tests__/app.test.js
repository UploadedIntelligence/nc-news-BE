const endpointsJson = require("../endpoints.json");
const db = require('../db/connection')
const request = require('supertest')
const app = require('../db/endpoints')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
require('jest-sorted')

beforeEach(()=> {
    return seed(data);
})

afterAll(() => {
    return db.end()
})

describe.skip("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
    test("200: Responds with an array of topic objects", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
                const { topics } = body
                expect(topics.length).toBe(3);
                topics.forEach(topic => {
                    expect(typeof topic.description).toBe('string')
                    expect(typeof topic.slug).toBe('string')
                })
            });
    })

    test("200: Responds with an article object", () => {
        return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                const article = articles[0]
                expect(articles.length).toBe(1)
                expect(article.article_id).toBe(2)
                expect(typeof article.title).toBe('string')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.author).toBe('string')
                expect(typeof article.body).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
            })
    })

    test("200: Responds with an article object", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                articles.forEach(article => {
                    expect(typeof article.article_id).toBe('number')
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.topic).toBe('string')
                    expect(typeof article.author).toBe('string')
                    expect(typeof article.body).toBe('string')
                    expect(typeof article.created_at).toBe('string')
                    expect(typeof article.votes).toBe('number')
                    expect(typeof article.article_img_url).toBe('string')
                })
                expect(articles).toBeSortedBy('created_at', { descending: true })
            })
    })

    test("200: Responds with an array of comments belonging to an article_id", () => {
        return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
                const { comments } = body
                expect(comments.length).toBe(2)
                comments.forEach(comment => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(comment.article_id).toBe(3)
                })
                expect(comments).toBeSortedBy('created_at', { ascending: true })
            })
    })

    test("200: Responds with an array of comments belonging to an article_id", () => {
        return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
                const { comments } = body
                expect(comments.length).toBe(2)
                comments.forEach(comment => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(comment.article_id).toBe(3)
                })
                expect(comments).toBeSortedBy('created_at', { ascending: true })
            })
    })
});



describe('POST /api/articles/:article_id/comments', () => {
    test('', () => {
        return request(app)
            .post('/api/articles/2/comments')
            .send({username: 'butter_bridge', body: 'Making a random comment'})
            .expect(200)
            .then((response) => {
                const { comment } = response.body
                const { comment_id, article_id, body, votes , author, created_at } = comment
                expect(comment_id).toBe(19)
                expect(article_id).toBe(2)
                expect(body).toBe('Making a random comment')
                expect(votes).toBe(0)
                expect(author).toBe('butter_bridge')
                expect(typeof created_at).toBe('string')
            })
    })
})