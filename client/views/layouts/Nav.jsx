const React = require('react');

module.exports = ({ siteTree }) => (
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      {siteTree.map(({ name, _id }) => (
        <li><a href={`/${_id}`}>{name}</a></li>
      ))}
    </ul>
  </nav>
);
