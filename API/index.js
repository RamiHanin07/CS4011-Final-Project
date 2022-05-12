const express = require('express')
const app = express()
const { corsOptionsRequests, corsSimpleRequests } = require('./middleware/cors')
const bodyParser = require('body-parser')
const removePoweredBy = require('./middleware/removePoweredBy')

const CreatePost = require('./services/CreatePost')
const GetPosts = require('./services/GetPosts')
const EditPost = require('./services/EditPost')
const DeletePost = require('./services/DeletePost')


app.options('*', corsOptionsRequests)
app.use(corsSimpleRequests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(removePoweredBy)

//app.post('/pokemon', Pokemon)
app.post('/create', CreatePost, (req, res) => {
    //console.log(req.body);
})

app.get('/posts', GetPosts, (req, res) => {

})

app.post('/edit', EditPost, (req, res) => {

})

app.post('/delete', DeletePost, (req, res) => {

})


module.exports = app