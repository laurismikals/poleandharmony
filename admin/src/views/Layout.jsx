import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from 'UI/Header/Header.jsx';
import { PageHeader } from 'UI/PageHeader/PageHeader.jsx';
import { SideBar } from 'UI/SideBar/SideBar.jsx';

import '../assets/vendor/bootstrap/css/bootstrap.css';
import '../assets/vendor/font-awesome/css/font-awesome.css';
import '../assets/css/theme.css';
import '../assets/css/skins/default.css';
import '../assets/css/theme-custom.css';

const Articles = lazy(() => import(/* webpackChunkName: "Articles" */ 'VIEWS/Articles/Articles.jsx'));
const ArticleAdd = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'VIEWS/ArticleAdd/ArticleAdd.jsx'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'VIEWS/Dashboard/Dashboard.jsx'));
const Mailbox = lazy(() => import(/* webpackChunkName: "Mailbox" */ 'VIEWS/Mailbox/Mailbox.jsx'));
const SiteTree = lazy(() => import(/* webpackChunkName: "SiteTree" */ 'VIEWS/SiteTree/SiteTree.jsx'));

const Layout = ({ page }) => (
  <>
    <Header />
    <div className="inner-wrapper">
      <SideBar />
      <section role="main" className="content-body">
        <PageHeader />
        <Suspense fallback={<div>Loading...</div>}>
          {page === 'Articles' && <Articles />}
          {page === 'ArticleAdd' && <ArticleAdd />}
          {page === 'Dashboard' && <Dashboard />}
          {page === 'Mailbox' && <Mailbox />}
          {page === 'SiteTree' && <SiteTree />}
        </Suspense>
      </section>
    </div>
  </>
);

Layout.propTypes = {
  page: PropTypes.string.isRequired,
};

const mapState = ({ page }) => ({ page });

export default connect(mapState)(Layout);
