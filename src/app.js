const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const dirPath = __dirname; 
app.set('views', path.join(dirPath, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(dirPath, '/public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(
  path.join(dirPath, '/json/accounts.json'), {encoding: 'UTF8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(dirPath, '/json/users.json'), { encoding: 'UTF8'});
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

app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  
  accounts[from].balance -= amount;
  accounts[to].balance += parseInt(amount);
  
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(dirPath, '/json/accounts.json'), 
    accountsJSON, { encoding: 'UTF8' });

  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit
  });
});
app.post('/payment', (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(dirPath, '/json/accounts.json'), 
    accountsJSON, { encoding: 'UTF8' });
  
    res.render('payment', { 
    message: 'Payment Successful',
    account: accounts.credit
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});