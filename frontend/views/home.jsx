const React = require('react');
const Layout = require('./layouts/main');

module.exports = ({ title, articles }) => (
  <Layout title={title}>
    <h1>{title}</h1>
    {articles.map(({ title, author, body, _id }) => (
      <a
        key={title}
        href={`/articles/${_id}`}
      >
        <h2>{title}</h2>
        <p>{author}</p>
        <div>{body}</div>
      </a>
    ))}
  </Layout>
);
