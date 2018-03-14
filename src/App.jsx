import React from 'react';
import { render } from 'react-dom';
import Site from './Site/Site';
import { Navigation } from './navigation';
import './sass/main';

const App = () => <Site />;

render(<App />, document.getElementById('app'));

new Navigation();
