import React from 'react';
import { render } from 'react-dom';
import Site from './assets/scripts/Site';
import './assets/sass/style.scss';

const App = () => <Site />;

render(<App />, document.getElementById('app'));
