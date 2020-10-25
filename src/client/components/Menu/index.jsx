import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Menu = ({ vertical, className, style, buttons, key }) => {
  return (
    <nav
      className={`menu${vertical ? ' horizontal-stack' : ' vertical-stack'}${
        ' ' + className || ''
      }`}
      style={style}
    >
      {buttons.map((attributes) => (
        <Button
          key={key}
          className={'menu-item ' + className}
          {...attributes}
        />
      ))}
    </nav>
  );
};

Menu.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

export default Menu;
