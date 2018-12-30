import React, { memo } from 'react';

import { Logo } from './Logo.jsx';
import { Notifications } from './Notifications.jsx';
import { UserBox } from './UserBox.jsx';

export const Header = memo(() => (
  <header className="header">
    <Logo />
    <div className="header-right">
      <Notifications />
      <span className="separator" />
      <UserBox />
    </div>
  </header>
));
