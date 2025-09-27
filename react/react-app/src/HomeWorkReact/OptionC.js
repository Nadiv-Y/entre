import { Component } from "react";


// class ExampleC extends Component {
//   state = { count: 0 };

//   handleClick() {
//     this.setState((prev) => ({ count: prev.count + 1 }));
//   }

//   render() {
//     return <button onClick={() => this.handleClick()}>C: {this.state.count}</button>;
//   }
// }


class ExampleC extends Component{
    state = {count : 0};

    increase = ()=>{
        this.setState((prev)=>({count : prev.count + 1}))
    }
    decrease = ()=>{
        this.setState((prev)=>({count : prev.count - 1}))
    }
    
    render(){
        return <div>
            <button onClick={()=>(this.increase())} >+</button>
            <span>{this.state.count}</span>
            <button onClick={()=>(this.decrease())} >-</button>
        </div>
    }
   
}


export default ExampleC