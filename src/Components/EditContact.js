import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//navigate can only be used in function and not in class
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const location = useLocation(); //cant be used in the class
    const { contact } = location.state || {};

    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} contact={contact} />;
  };
}

class EditContact extends React.Component {
  constructor(props) {
    super(props);

    const { id, name, email } = props.contact;
    this.state = {
      id,
      name,
      email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Fill up all form");
      return;
    }
    this.props.updateContHandler(this.state);
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
        <h2>Edit Contact</h2>

        <form className="ui form" onSubmit={this.update}>
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
          <button className="ui button purple">Update</button>
        </form>
      </div>
    );
  }
}
//export default AddContact;
export default withNavigation(EditContact); //export in a wrapper function
