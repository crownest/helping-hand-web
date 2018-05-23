// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Logo from 'components/Logo/index';


export default class Header extends Component {
  render() {
    const { url, title, logoColor } = this.props;

    return (
      <header className="header">
        <Logo url={url} color={logoColor} />
        <h1 className="header__title">{title}</h1>
      </header>
    );
  }
}


Header.propTypes = {
  title: PropTypes.string.isRequired
};

Header.defaultProps = {
  url: "/",
  logoColor: "green"
};
