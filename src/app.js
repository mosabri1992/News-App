const express = require('express')
const app = express()
const port = process.env.PORT || 5000

//static files
const path = require('path')
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

///////// hbs engine

app.set('view engine', 'hbs')

//setting views path
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)

//setting partial path
const hbs = require('hbs')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

const newsApi = require('./tools/news')

app.get('/', (req, res) => {
    newsApi((error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            res.render('index', {
                articles: response
            })
        }
    })

})


// 404 page
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Error'
    })
})


app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})