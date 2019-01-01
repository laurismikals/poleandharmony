import React, { Fragment, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../ui/Header/Header.jsx';
import { PageHeader } from '../ui/PageHeader/PageHeader.jsx';
import { SideBar } from '../ui/SideBar/SideBar.jsx';

import '../assets/vendor/bootstrap/css/bootstrap.css';
import '../assets/vendor/font-awesome/css/font-awesome.css';
import '../assets/css/theme.css';
import '../assets/css/skins/default.css';
import '../assets/css/theme-custom.css';

const ArticleAdd = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'VIEWS/ArticleAdd/ArticleAdd.jsx'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'VIEWS/Dashboard/Dashboard.jsx'));
const Mailbox = lazy(() => import(/* webpackChunkName: "Mailbox" */ 'VIEWS/Mailbox/Mailbox.jsx'));
const PageAdd = lazy(() => import(/* webpackChunkName: "PageAdd" */ 'VIEWS/PageAdd/PageAdd.jsx'));
const Sitetree = lazy(() => import(/* webpackChunkName: "Sitetree" */ 'VIEWS/Sitetree/Sitetree.jsx'));
const SitetreeAdd = lazy(() => import(/* webpackChunkName: "SitetreeAdd" */ 'VIEWS/SitetreeAdd/SitetreeAdd.jsx'));

const Layout = ({ page }) => (
  <Fragment>
    <Header />
    <div className="inner-wrapper">
      <SideBar />
      <section role="main" className="content-body">
        <PageHeader />
        <Suspense fallback={<div>Loading...</div>}>
          {page === 'ArticleAdd' && <ArticleAdd />}
          {page === 'Dashboard' && <Dashboard />}
          {page === 'Mailbox' && <Mailbox />}
          {page === 'PageAdd' && <PageAdd />}
          {page === 'Sitetree' && <Sitetree />}
          {page === 'SitetreeAdd' && <SitetreeAdd />}
        </Suspense>
      </section>
    </div>
  </Fragment>
);

Layout.propTypes = {
  page: PropTypes.string.isRequired,
};

const mapState = ({ page }) => ({ page });

export default connect(mapState)(Layout);
