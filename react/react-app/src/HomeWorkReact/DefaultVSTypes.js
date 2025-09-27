import React from "react";
import PropTypes from "prop-types";

class ChiledComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>The age: {this.props.age}</p>
        <p>Status: {this.props.online ? "online" : "offline"}</p>
        <p>Role: {this.props.role}</p>
      </div>
    );
  }
}


ChiledComponent.propTypes = {
  title: PropTypes.string.isRequired,
  age: PropTypes.number,
  online: PropTypes.bool,
  role: PropTypes.oneOf(["admin", "user", "guest"]),
};

ChiledComponent.defaultProps = {
  age: 18,
  online: false,
  role: "guest",
};

export default ChiledComponent;

