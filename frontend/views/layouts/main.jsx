const React = require('react');

module.exports = ({ title, children }) => (
  <html>
  <head>
    <title>{title}</title>
    <link rel="stylesheet" href="/frontend/bundle.css" />
  </head>
  <body>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/articles/add">Add article</a></li>
    </ul>
  </nav>
    {children}
  </body>
  </html>
);
