const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();
const dirPath = __dirname; 
app.set('views', path.join(dirPath, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(dirPath, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Account Summary',
    accounts: accounts 
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
     user: users[0]
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});