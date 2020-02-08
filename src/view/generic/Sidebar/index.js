import React from "react";
class Sidebar extends React.Component {
  render() {
    return (
      <>
        <aside
          className={"sidebar " + (this.props.className || "")}
          style={this.props.style}
        >
          {this.props.children}
        </aside>
      </>
    );
  }
}

export default Sidebar;
