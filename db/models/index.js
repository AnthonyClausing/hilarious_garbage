const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');

Comment.belongsTo(Post);
Comment.belongsTo(User);
Post.belongsTo(User, { as: 'creator'});
Post.hasMany(Comment);
User.hasMany(Post);
User.hasMany(Comment);

module.exports = {User, Comment, Post}