import React, { Component } from 'react';

const Header = () => (
  <header className="site-header">
    <h1 className="site-title">{props.title}</h1>
    <p className="site-description">{props.description}</p>
  </header>
);

export default Header;
