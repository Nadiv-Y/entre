import { Component } from "react";

class ExampleB extends Component {
  state = { count: 0 };

  increase = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  decrease = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  };

  render() {
    return (
      <div>
        <p>example for public class field arrow</p>
        <button onClick={this.increase}> +</button>
        <span>{this.state.count}</span>
        <button onClick={this.decrease} >-</button>
      </div>
    );
  }
}

export default ExampleB;
