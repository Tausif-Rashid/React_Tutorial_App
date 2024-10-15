import React from "react";
import image from "../Images/user.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; //for using location of state

const CardDetails = (props) => {
  //const { id, name, email } = props.contact;

  const location = useLocation();
  const { contact } = location.state || {}; //receiving the obj sent as state
  //console.log(contact);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={image} alt="user" />
        </div>

        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
        {/* <button className="ui button red">Delete</button> */}

        <div className="ui center">
          <Link to="/">
            {/*back button pressed goes to / link */}

            <button className="ui button purple center">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
