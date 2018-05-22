// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Posts from '../Blog/Posts';
import Post from '../Post/Post';
import Four04 from '../Four04/Four04';

const Site = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route
          path="/:slug"
          component={(props: { match: Object }) => {
            const slug = props.match.params.slug;
            return <Post postSlug={slug} {...props} />;
          }}
        />
        <Route component={Four04} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default Site;
