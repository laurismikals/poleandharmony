import React, { memo } from 'react';

export const Header = memo(() => (
  <div className="sidebar-header">
    <div className="sidebar-toggle hidden-xs" data-target="html" data-fire-event="sidebar-left-toggle">
      <i className="fa fa-bars" aria-label="Toggle sidebar" />
    </div>
  </div>
));
