import React, { memo } from 'react';
import { NavLink } from 'redux-first-router-link';

import LogoImage from '../../assets/images/logo.png';

export const Logo = memo(() => (
  <div className="logo-container">
    <NavLink to="/" className="logo" exact>
      <img src={LogoImage} height="35" alt="Pole&Harmony logo" />
    </NavLink>
    <div className="visible-xs toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
      <i className="fa fa-bars" aria-label="Toggle sidebar" />
    </div>
  </div>
));
