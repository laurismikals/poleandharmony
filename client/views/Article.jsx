const React = require('react');
const Layout = require('./layouts/Main.jsx');

module.exports = ({ siteTree, article: { title, author, body } }) => (
  <Layout title={title} siteTree={siteTree}>
    <h1>{title}</h1>
    <p>Autors: {author}</p>
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </Layout>
);
