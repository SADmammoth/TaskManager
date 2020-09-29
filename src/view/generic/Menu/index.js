import React from "react";
import propTypes from "prop-types";
import Button from "../Button";

class Menu extends React.Component {
  render() {
    return (
      <nav
        className={`menu ${
          this.props.vertical ? "horizontal-stack" : "vertical-stack"
        } ${this.props.className || ""}`}
        style={this.props.style}
      >
        {this.props.buttons.map((el, i, arr) => (
          <Button className={"menu-item " + this.props.className} {...el} />
        ))}
      </nav>
    );
  }
}

Menu.propTypes = {
  buttons: propTypes.arrayOf(propTypes.shape(Button.propTypes)).isRequired,
  vertical: propTypes.bool
};

export default Menu;
