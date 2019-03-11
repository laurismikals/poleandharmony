const React = require('react');
const Layout = require('./layouts/main');

module.exports = ({ title }) => (
  <Layout title={title}>
    <h1>{title}</h1>
    <form method="post" action="/articles/add">
      <input
        type="text"
        name="title"
        placeholder={'Title'}
       />
      <input
        type="text"
        name="author"
        placeholder={'Author'}
      />
      <textarea name="body" placeholder={'Text'} />
      <button type="submit">Submit</button>
    </form>
  </Layout>
);
