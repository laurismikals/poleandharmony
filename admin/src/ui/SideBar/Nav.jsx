import React, { memo } from 'react';
import { NavLink } from 'redux-first-router-link';

export const Nav = memo(() => (
  <nav className="nav-main" role="navigation">
    <ul className="nav nav-main">
      <li>
        <NavLink to="/" activeClassName="active" exact>
          <i className="fa fa-home" aria-hidden="true" />
          <span>Panelis</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mailbox" activeClassName="active" exact>
          <span className="pull-right label label-primary">182</span>
          <i className="fa fa-envelope" aria-hidden="true" />
          <span>Inbox</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/sitetree" activeClassName="active" exact>
          <i className="fa fa-copy" aria-hidden="true" />
          <span>Lapas koks</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/articleCategories" activeClassName="active" exact>
          <i className="fa fa-copy" aria-hidden="true" />
          <span>Rakstu kategorijas</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles" activeClassName="active" exact>
          <i className="fa fa-copy" aria-hidden="true" />
          <span>Raksti</span>
        </NavLink>
      </li>
      <li>
        <a href={`//${process.env.DOMAIN}`} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-external-link" aria-hidden="true" />
          <span>
            Uz lapu
          </span>
        </a>
      </li>
    </ul>
  </nav>
));
