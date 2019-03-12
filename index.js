const express = require('express');
const path = require('path');
const vhost = require('vhost');
require('dotenv').load();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/poleandharmony', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB...'));
db.on('error', (err) => console.error(err));

const app = express();

const createVirtualHost = (domainName, dirPath) => vhost(
  domainName,
  require(path.join(__dirname, dirPath)).app,
);

app.use(createVirtualHost(process.env.DOMAIN, 'client'));
app.use(createVirtualHost(`www.${process.env.DOMAIN}`, 'client'));
app.use(createVirtualHost(`*.admin.${process.env.DOMAIN}`, 'admin'));

app.listen(80, () => console.log('Server is running on port 80...'));
