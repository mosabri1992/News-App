const request = require('request')
const newsApi = (callback) => {
    const newsUrl = 'https://newsapi.org/v2/top-headlines?country=eg&category=business&apiKey=57dba52bff5049888cdabe82d3800b72'
    request({ url: newsUrl, json: true }, (error, response) => {

        console.log(error)
        console.log(response)
        if (error) {
            callback('error', undefined)
        } else if (response.body.status == 'error') {
            callback(response.body.message, undefined)
        } else if (response.body.articles.length == 0) {
            callback('Wrong Country or category', undefined)
        } else {
            callback(undefined, response.body.articles)
        }

    })
}

module.exports = newsApi