import React from 'react';
import propTypes from 'prop-types';
import MenuButton from './MenuButton';

class Menu extends React.Component {
  render() {
    return (
      <nav
        className={`menu ${
          this.props.vertical ? 'horizontal-stack' : 'vertical-stack'
        } ${this.props.className || ''}`}
        style={this.props.style}
      >
        {this.props.buttons.map((el, i, arr) => (
          <MenuButton className={'menu-item ' + this.props.className} {...el} />
        ))}
      </nav>
    );
  }
}

Menu.propTypes = {
  buttons: propTypes.arrayOf(propTypes.shape(MenuButton.propTypes)).isRequired,
  vertical: propTypes.bool
};

export default Menu;
