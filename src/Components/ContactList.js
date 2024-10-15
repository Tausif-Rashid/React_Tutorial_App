import React from "react";
import CardContact from "./ContactCard";
import { Link } from "react-router-dom";

//using props

const ContactList = (props) => {
  //console.log(props);
  const DeleteHandler = (id) => {
    props.getContactId(id); //now it sends id to delete func of app.js, its parent
  };
  const renderList = props.contact.map((contact) => {
    return (
      <CardContact
        key={contact.id}
        contact={contact}
        clickHandler={DeleteHandler}
      />
    );
  });
  return (
    <div>
      <div className="ui menu container center" style={{ marginTop: "20px" }}>
        <h3>Contact List</h3>
      </div>

      <div className="ui relaxed celled list">{renderList}</div>
      <div className="ui container">
        <Link to="/add">
          <button className="ui button purple right">Add Contact</button>
        </Link>
      </div>
    </div>
  );
};
export default ContactList;
