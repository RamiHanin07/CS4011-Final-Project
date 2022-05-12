const Post = require('../models/Posts')

const EditPost = async (req, res, next) =>{

    const id = req.body.id
    const newBody = req.body.body
    const newTitle = req.body.title

    const oldPost = await Post.findById(id)

    const newPost = await Post.findByIdAndUpdate(id, {
        title: newTitle,
        body: newBody
    }) 

    res.send('Success')
}

module.exports = EditPost