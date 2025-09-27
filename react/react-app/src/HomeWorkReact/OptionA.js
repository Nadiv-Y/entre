import React, { Component } from "react";


class ExampleA extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.hendleClick = this.hendleClick.bind(this);
  }

  hendleClick() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  render() {
    return (
      <button onClick={this.hendleClick}>option A this.hendleClick inside constructor with .bind: {this.state.count}</button>
    );
  }
}

export default ExampleA;
