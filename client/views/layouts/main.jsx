const React = require('react');

module.exports = ({ title, siteTree, children }) => (
  <html>
  <head>
    <title>{title}</title>
    <link rel="stylesheet" href="/client/frontend/bundle.css" />
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        {siteTree.map(({ name, _id }) => (
          <li><a href={`/${_id}`}>{name}</a></li>
        ))}
      </ul>
    </nav>
    {children}
  </body>
  </html>
);
