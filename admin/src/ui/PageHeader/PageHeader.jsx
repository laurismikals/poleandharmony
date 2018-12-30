import React from 'react';

export const PageHeader = () => (
  <header className="page-header">
    <h2>Dashboard</h2>

    <div className="right-wrapper pull-right">
      <ol className="breadcrumbs">
        <li>
          <a href="index.html">
            <i className="fa fa-home" />
          </a>
        </li>
        <li><span>Dashboard</span></li>
      </ol>

      <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left" /></a>
    </div>
  </header>
);
