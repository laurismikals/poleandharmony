import { NOT_FOUND } from 'redux-first-router';

const components = {
  ARTICLES: 'Articles',
  ARTICLES_ADD: 'ArticleAdd',
  HOME: 'Dashboard',
  MAILBOX: 'Mailbox',
  SITETREE: 'SiteTree',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'HOME', action = {}) => components[action.type] || state;
