const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

var AddTaskController = require('./src/controller/AddTaskController.js');

app.use(express.static(__dirname+'/dist'))
app.get('/tasks/create', AddTaskController.create);

app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.all('/404-error-page', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.all('*', (req, res) => {
  res.redirect('/404-error-page');
});

app.listen(port);
