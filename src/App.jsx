/* eslint-disable */
const sass = require('./assets/sass/style.scss');

import React from 'react';
import { render } from 'react-dom';
import Header from './assets/scripts/Header';

const App = () => (
  <Header
    title="Aurora Theme"
    description="A clean, modern React-powered theme."
  />
);

render(<App />, document.getElementById('page'));
