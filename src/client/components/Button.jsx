import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ icon, content, className, title, style, type, action }) => {
  return (
    <button
      className={icon ? 'icon-btn ' : 'btn ' + (className || '')}
      onClick={action}
      title={title}
      style={style}
      type={type}
    >
      {icon}
      {content}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  action: () => {},
};

export default Button;
