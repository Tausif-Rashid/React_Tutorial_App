import React from "react";
import { useNavigate } from "react-router-dom";

//navigate can only be used in function and not in class
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Fill up all form");
      return;
    }
    this.props.addContHandler(this.state);
    this.setState({ name: "", email: "" });
    //console.log(this.context);
    //this.context.history.push("/");
    //const navigate = useNavigate();
    //navigate("/");
    this.props.navigate("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>

        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button purple">Add</button>
        </form>
      </div>
    );
  }
}
//export default AddContact;
export default withNavigation(AddContact); //export in a wrapper function
