const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', async (req, res) => {
  res.sendfile(path.join(__dirname + '/dist/index.html'));
});

exports.app = app;

