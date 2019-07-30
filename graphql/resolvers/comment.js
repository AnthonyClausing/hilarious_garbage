const {Comment, User} = require('../../db/models')

function commentMapper(comments) {
  return comments.map(comment => {
    return {
      id: comment.id,
      text: comment.text,
      image: comment.image,
      imageId: comment.imageId,
      createdAt: comment.createdAt,
      user: comment.user
    }
  })
}

module.exports = {
  addComment: async (commentData) => {
    let comment = await Comment.create({
      text: commentData.commentInput.text,
      image: commentData.commentInput.image,
      imageId: commentData.commentInput.imageId,
      postId: commentData.commentInput.postId,
      userId: commentData.commentInput.userId,
    })
    let postComments = await Comment.findAll({where: {postId: commentData.commentInput.postId}, include : User})
    return commentMapper(postComments) 
  }
}