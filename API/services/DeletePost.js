const Post = require('../models/Posts')

const DeletePost = async (req, res, next) =>{

    const id = req.query.id
    const oldPost = await Post.findByIdAndDelete(id)
    res.send('Deleted')
}

module.exports = DeletePost