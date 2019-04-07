const React = require('react');
const Layout = require('./layouts/main');

module.exports = ({ article: { _id, title, author, body } }) => (
  <Layout title={title}>
    <h1>{title}</h1>
    <p>{author}</p>
    <div>{body}</div>
    <a href={`/articles/edit/${_id}`}>Edit</a>
  </Layout>
);
