import React from 'react';
import SkipLink from './SkipLink';

const Header = props => (
  <header className="site-header">
    <SkipLink />
    <h1 className="site-title">{props.title}</h1>
    <p className="site-description">{props.description}</p>
  </header>
);

export default Header;
