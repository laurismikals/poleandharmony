const React = require('react');
const Nav = require('./Nav.jsx');

module.exports = ({ title, siteTree, children }) => (
  <html>
  <head>
    <title>{title}</title>
    <link rel="stylesheet" href="/client/frontend/bundle.css" />
  </head>
  <body>
    <Nav siteTree={siteTree} />
    {children}
  </body>
  </html>
);
