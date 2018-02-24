import React from 'react';
import SkipLink from './SkipLink';
import Header from './Header';

const Site = () => (
  <div id="page" className="site">
    <SkipLink />
    <Header
      title="Aurora Theme"
      description="A clean, modern React-powered theme."
    />
  </div>
);

export default Site;
