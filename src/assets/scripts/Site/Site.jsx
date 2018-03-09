import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SkipLink from '../SkipLink/SkipLink';
import Header from '../SiteHeader/SiteHeader';
import Posts from '../Posts/Posts';
import Four04 from '../Four04/Four04';

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
