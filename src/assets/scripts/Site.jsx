import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SkipLink from './SkipLink';
import Header from './Header';
import Posts from './Posts';
import Four04 from './Four04';

const Site = () => (
  <div id="page" className="site">
    <SkipLink />
    <Header
      title="Aurora Theme"
      description="A clean, modern React-powered theme."
    />
    <div id="primary" className="content-area">
      <main id="main" className="site-main" role="main">
        <BrowserRouter>
          <Provider store={store}>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route component={Four04} />
            </Switch>
          </Provider>
        </BrowserRouter>
      </main>
    </div>
  </div>
);

export default Site;
