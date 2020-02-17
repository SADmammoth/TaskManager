import React from "react";
import propTypes from "prop-types";

class Button extends React.Component {
  render() {
    return (
      <button
        className={
          this.props.icon ? "icon-btn " : "btn " + (this.props.className || "")
        }
        onClick={this.props.action}
        title={this.props.title}
        style={this.props.style}
        type={this.props.type}
      >
        {(() => {
          let array = [];
          if (this.props.icon) {
            array.push(<img src={this.props.icon} title={this.props.title} />);
          }
          if (this.props.content) {
            array.push(this.props.content);
          }
          return array;
        })()}
      </button>
    );
  }
}

Button.propTypes = {
  title: propTypes.string.isRequired,
  action: propTypes.func.isRequired,
  icon: propTypes.string,
  content: propTypes.any,
  className: propTypes.string,
  icon: propTypes.bool
};

export default Button;
