const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const dirPath = __dirname; 
app.set('views', path.join(dirPath, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(dirPath, '/public')));

const accountData = fs.readFileSync(
  path.join(dirPath, '/json/accounts.json'), {encoding: 'UTF-8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(dirPath, '/json/users.json'), { encoding: 'UTF-8'});
const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Account Summary',
    accounts: accounts 
  });
});

app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  });
});

app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  });
});

app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
     user: users[0]
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
})