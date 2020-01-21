import React from 'react';
import propTypes from 'prop-types';
import MenuButton from './MenuButton';

class Menu extends React.Component {
  render() {
    return (
      <ul>
        {this.props.buttons.map((el, i, arr) => (
          <MenuButton
            title={el.title}
            action={el.action}
            icon={el.icon}
            height={
              !this.props.vertical
                ? this.props.height
                : this.props.height / arr.length
            }
            width={
              this.props.vertical
                ? this.props.width
                : this.props.width / arr.length
            }
          />
        ))}
      </ul>
    );
  }
}

Menu.propTypes = {
  buttons: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string.isRequired,
      icon: propTypes.string.isRequired,
      action: propTypes.func.isRequired
    })
  ).isRequired,
  height: propTypes.number.isRequired,
  width: propTypes.number.isRequired,
  vertical: propTypes.bool
};

export default Menu;
