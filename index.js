const express = require('express');
const path = require('path');
const vhost = require('vhost');

const app = express();

const createVirtualHost = (domainName, dirPath) => vhost(domainName, require(path.join(__dirname, dirPath)).app);
const clientHost = createVirtualHost('poleandharmony.local', 'client');
const adminHost = createVirtualHost('admin.poleandharmony.local', 'admin');

app.use(clientHost);
app.use(adminHost);

app.listen(80, () => console.log('Server is running on port 80...'));
