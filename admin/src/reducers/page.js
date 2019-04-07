import { NOT_FOUND } from 'redux-first-router';

const components = {
  ARTICLE_CATEGORIES: 'ArticleCategories',
  ARTICLES: 'Articles',
  HOME: 'Dashboard',
  MAILBOX: 'Mailbox',
  SITETREE: 'SiteTree',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'HOME', action = {}) => components[action.type] || state;
