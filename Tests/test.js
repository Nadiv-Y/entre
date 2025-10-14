import React from "react"

class NameForm extends React.Component {
  state = {
    name: "",
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value }) // עדכון state לפי value של input
  }

  handleSubmit = (e) => {
    e.preventDefault() // מונע ריענון הדף
    console.log("Submitted name:", this.state.name) // מדפיס את הערך הנוכחי
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.name} // controlled input
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default NameForm
