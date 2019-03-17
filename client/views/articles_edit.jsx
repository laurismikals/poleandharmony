const React = require('react');
const Layout = require('./layouts/main');

module.exports = ({
  title,
  article,
  article: {
    id,
    author,
    body
  },
}) => (
  <Layout title={title}>
    <h1>{article.title}</h1>
    <form method="post" action={`/articles/edit/${id}`}>
      <input
        type="text"
        name="title"
        defaultValue={article.title}
        placeholder={'Title'}
      />
      <input
        type="text"
        name="author"
        defaultValue={author}
        placeholder={'Author'}
      />
      <textarea
        name="body"
        defaultValue={body}
        placeholder={'Text'}
      />
      <button type="submit">Submit</button>
    </form>
  </Layout>
);
