const Post = require('../models/Posts')

const CreatePost = async (req, res, next) =>{
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  })

  const result = await post.save()
  res.send(result)
}

module.exports = CreatePost