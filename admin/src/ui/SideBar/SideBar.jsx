import React, { memo } from 'react';

import { Header } from './Header.jsx';
import { Nav } from './Nav.jsx';

export const SideBar = memo(() => (
  <aside className="sidebar-left">
    <Header />
    <div className="nano">
      <div className="nano-content">
        <Nav />
      </div>
    </div>
  </aside>
));
