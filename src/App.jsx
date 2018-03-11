import React from 'react';
import { render } from 'react-dom';
import Site from './assets/Site/Site';
import './assets/sass/style';

const App = () => <Site />;

render(<App />, document.getElementById('app'));
