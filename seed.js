const db = require('./db');
const {User, Post, Comment} = require('./db/models');


const users = [{
    name: 'test1',
    email: 'test1@test.com', 
    password: 'tester'
  },{
    name: 'test2',
    email: 'test2@test.com', 
    password: 'tester'
  },{
    name: 'test3',
    email: 'test3@test.com', 
    password: 'tester'
  },{
    name: 'test4',
    email: 'test4@test.com', 
    password: 'tester'
  },{
    name: 'test5',
    email: 'test5@test.com', 
    password: 'tester'
  },{
    name: 'test6',
    email: 'test6@test.com', 
    password: 'tester'
  },{
    name: 'test7',
    email: 'test7@test.com', 
    password: 'tester'
  },{
    name: 'test8',
    email: 'test8@test.com', 
    password: 'tester'
  },{
    name: 'test9',
    email: 'test9@test.com', 
    password: 'tester'
  },{
    name: 'test10',
    email: 'test10@test.com', 
    password: 'tester'
}];

const posts = [{
    title: 'test1 post', 
    description: 'this is test1', 
    content: 'what is test1?'
  },{
    title: 'test2 post', 
    description: 'this is test2', 
    content: 'what is test2?'
  },{
    title: 'test3 post', 
    description: 'this is test3', 
    content: 'what is test3?'
  },{
    title: 'test4 post', 
    description: 'this is test4', 
    content: 'what is test4?'
  },{
    title: 'test5 post', 
    description: 'this is test5', 
    content: 'what is test5?'
  },
  {
    title: 'test6 post', 
    description: 'this is test6', 
    content: 'what is test6?'
  },
  {
    title: 'test7 post', 
    description: 'this is test7', 
    content: 'what is test7?'
  },
  {
    title: 'test8 post', 
    description: 'this is test8', 
    content: 'what is test8?'
  },
  {
    title: 'test9 post', 
    description: 'this is test9', 
    content: 'what is test9?'
  },
  {
    title: 'test10 post', 
    description: 'this is test10', 
    content: 'what is test10?'
  }];

const comments = [{
    text: 'this is wack'
  },{
    text: 'this is crazy, man'
  },{
    text: 'YAAAAAAAS'
},{
  text: 'thanks I hate it'
},{
  text: 'democracy was a mistake'
}];

const seed = () => {
  return Promise.all(users.map(user => User.create(user)))
  .then((createdUsers) => Promise.all(posts.map(post =>{
    return Post.create({...post, userId: createdUsers[Math.floor(Math.random() * users.length)].id})
  })))
  .then((createdPosts) => Promise.all(comments.map(comment =>{
    return Comment.create({...comment, postId: createdPosts[Math.floor(Math.random() * posts.length)].id, userId: Math.floor(Math.random() * 10) + 1})
  })))
  .catch(err => {
    throw err 
  })
}

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();