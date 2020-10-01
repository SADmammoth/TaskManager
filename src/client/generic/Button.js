import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button
        className={
          this.props.icon ? 'icon-btn ' : 'btn ' + (this.props.className || '')
        }
        onClick={this.props.action}
        title={this.props.title}
        style={this.props.style}
        type={this.props.type}
      >
        {this.props.icon}
        {this.props.content}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  content: PropTypes.any,
  className: PropTypes.string,
};

export default Button;
