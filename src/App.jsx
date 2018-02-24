/* eslint-disable */
const sass = require('./assets/sass/style.scss');

import React from 'react';
import { render } from 'react-dom';
import Site from './assets/components/Site';

const App = () => <Site />;

render(<App />, document.getElementById('app'));
