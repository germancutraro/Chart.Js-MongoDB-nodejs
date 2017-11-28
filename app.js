const express = require('express');
const app = express();
const server = require('http').createServer(app);
const faker = require('faker');
const port = process.env.PORT || 3000;

// user model
const User = require('./models/User');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  let gt, lt;
  User.find({})
    .then(users => {
      gt = users.filter(user => user.age > 18);
      lt = users.filter(user => user.age <  18);
      res.render('index', {greater: gt.length, less: lt.length});
    })
    .catch(err => console.error(err));
});

app.get('/generate', (req, res) => {
  for (let i = 0; i < 100; i++) {
    let firstName = faker.name.firstName(),
        lastName = faker.name.lastName(),
        randomAge = Math.round(Math.random() * (90 - 1) + 1);
    // create users
    User.create({firstName: firstName, lastName: lastName, age: randomAge})
      .then(() => {})
      .catch(err => console.error(err));
  } // end for loop
  res.redirect('/');
});

server.listen(port, () => console.log(`App running on port ${port}`));
