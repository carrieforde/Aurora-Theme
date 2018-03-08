import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SkipLink from './SkipLink';
import Header from './Header';
import Four04 from './Four04';

const Site = () => (
  <div id="page" className="site">
    <SkipLink />
    <Header title="Aurora Theme" description="A clean, modern React-powered theme." />
    <div id="primary" className="content-area">
      <main id="main" className="site-main" role="main">
        <BrowserRouter>
          <Route component={Four04} />
        </BrowserRouter>
      </main>
    </div>
  </div>
);

export default Site;
