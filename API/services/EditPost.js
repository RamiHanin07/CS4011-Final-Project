const Post = require('../models/Posts')

const EditPost = async (req, res, next) =>{

    const id = req.query.id
    const newBody = req.query.body
    const newTitle = req.query.title

    const oldPost = await Post.findById(id)

    const newPost = await Post.findByIdAndUpdate(id, {
        title: newTitle,
        body: newBody
    }) 

    res.send('Success')
}

module.exports = EditPost