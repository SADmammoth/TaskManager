import React from 'react';
import propTypes from 'prop-types';

class MenuButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.action}>
        <img
          src={this.props.icon}
          title={this.props.title}
          height={this.props.height}
          width={this.props.width}
        />
      </button>
    );
  }
}

MenuButton.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  action: propTypes.func.isRequired,
  height: propTypes.number.isRequired,
  width: propTypes.number.isRequired
};

export default MenuButton;
