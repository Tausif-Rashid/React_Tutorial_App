import React from "react";
import CardContact from "./ContactCard";
import { Link } from "react-router-dom";
import { useRef } from "react";

//using props

const ContactList = (props) => {
  //console.log(props);

  const inputEl = useRef("");
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

  const getSearch = () => {
    //console.log(inputEl.current.value);'
    props.search(inputEl.current.value); //send the current value in box to app.js
  };
  return (
    <div>
      <div className="ui menu container center" style={{ marginTop: "20px" }}>
        <h3>Contact List</h3>
      </div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl} //content will go to inputEl
            type="text"
            placeholder="Search"
            className="prompt"
            value={props.term} //this resets the text box to match appjs searchterm, if that is left usnset, then text box becomes every time
            onChange={getSearch} //triggers the func when a letter is typed
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui relaxed celled list">
        {renderList.length > 0 ? renderList : "No Contacts"}
      </div>
      <div className="ui container">
        <Link to="/add">
          <button className="ui button purple right">Add Contact</button>
        </Link>
      </div>
    </div>
  );
};
export default ContactList;
