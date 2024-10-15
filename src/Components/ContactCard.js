import React from "react";
import image from "../Images/user.png";
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

// const ShowContact = (id, cont) => {
//   const navigate = useNavigate();
//   navigate(`contact/${id}`, { state: { contact: cont } });
// };

const CardContact = (props) => {
  const { id, name, email } = props.contact;
  const contact = props.contact;
  //to={{ pathname: `contact/${id}`, state: { contact: props.contact } }}
  // console.log(id);
  return (
    <div className="item container">
      <img className="ui avatar image" src={image} alt="user" />
      <div className="content">
        {/* <Link to={`contact/${id}`} onClick={ShowContact(id, props.contact)}> */}
        <Link to={`contact/${id}`} state={{ contact }}>
          <div className="Header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      {/* <button className="ui button red">Delete</button> */}
      <Link to={`edit/`} state={{ contact }}>
        <i
          className="blue edit alternate icon"
          style={{ marginTop: "7px" }}
          //onClick={() => props.clickHandler(id)} //pass id to clickHandler, so ContactList gets it
        ></i>
      </Link>

      <i
        className="red trash alternate icon"
        style={{ marginTop: "7px" }}
        onClick={() => props.clickHandler(id)} //pass id to clickHandler, so ContactList gets it
      ></i>
    </div>
  );
};

export default CardContact;
