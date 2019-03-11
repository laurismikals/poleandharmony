const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/poleandharmony', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB...'));
db.on('error', (err) => console.error(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', async (req, res) => {
  res.sendfile(__dirname + '/dist/index.html');
});

exports.app = app;

