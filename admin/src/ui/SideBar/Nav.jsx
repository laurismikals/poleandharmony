import React, { memo } from 'react';
import { NavLink } from 'redux-first-router-link';

import { IconHome } from 'UI/Icons/IconHome.jsx';
import { IconEnvelope } from 'UI/Icons/IconEnvelope.jsx';
import { IconSiteMap } from 'UI/Icons/IconSiteMap.jsx';
import { IconCopy } from 'UI/Icons/IconCopy.jsx';
import { IconExternalLink } from 'UI/Icons/IconExternalLink.jsx';

const navArr = [
  { to: '/', text: 'Panelis', icon: () => <IconHome /> },
  { to: '/mailbox', text: 'Inbox', icon: () => <IconEnvelope />, label: 182 },
  { to: '/sitetree', text: 'Lapas koks', icon: () => <IconSiteMap /> },
  { to: '/articleCategories', text: 'Rakstu kategorijas', icon: () => <IconCopy /> },
  { to: '/articles', text: 'Raksti', icon: () => <IconCopy /> },
];

export const Nav = memo(() => (
  <nav className="nav-main" role="navigation">
    <ul className="nav nav-main">
      {navArr.map(({ to, text, icon: Icon, label }, i) => (
        <li key={i}>
          <NavLink to={to} activeClassName="active" exact>
            {label && <span className="pull-right label label-primary">{label}</span>}
            <Icon />
            <span>{text}</span>
          </NavLink>
        </li>
      ))}
      <li>
        <a href={`//${process.env.DOMAIN}`} target="_blank" rel="noopener noreferrer">
          <IconExternalLink />
          <span>
            Uz lapu
          </span>
        </a>
      </li>
    </ul>
  </nav>
));
