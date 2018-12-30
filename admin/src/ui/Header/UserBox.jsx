import React, { memo } from 'react';

export const UserBox = memo(() => (
  <div className="userbox">
    <a href="#" data-toggle="dropdown">
      <div className="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@JSOFT.com">
        <span className="name">John Doe Junior</span>
        <span className="role">administrator</span>
      </div>

      <i className="fa custom-caret" />
    </a>

    <div className="dropdown-menu">
      <ul className="list-unstyled">
        <li className="divider" />
        <li>
          <a role="menuitem" tabIndex="-1" href="pages-user-profile.html">
            <i className="fa fa-user" />
            My Profile
          </a>
        </li>
        <li>
          <a role="menuitem" tabIndex="-1" href="#" data-lock-screen="true">
            <i className="fa fa-lock" />
            Lock Screen
          </a>
        </li>
        <li>
          <a role="menuitem" tabIndex="-1" href="pages-signin.html">
            <i className="fa fa-power-off" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
));
