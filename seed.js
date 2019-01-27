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
    title: 'test1', 
    description: 'this is test1', 
    content: 'what is test1?'
  },{
    title: 'test2', 
    description: 'this is test2', 
    content: 'what is test2?'
  },{
    title: 'test3', 
    description: 'this is test3', 
    content: 'what is test3?'
  },{
    title: 'test4', 
    description: 'this is test4', 
    content: 'what is test4?'
  },{
    title: 'test5', 
    description: 'this is test5', 
    content: 'what is test5?'
}];

const comments = [{
    text: 'this is wack'
  },{
    text: 'this is crazy, man'
  },{
    text: 'YAAAAAAAS'
}];

const seed = () => Promise.all(users.map(user => User.create(user)))

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
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

//main();