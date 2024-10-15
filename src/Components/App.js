import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  //const LOCAL_KEY = "contactsStorage";
  const [contacts, setContacts] = useState([]); //initially empty arr

  //func to get contacts from axios api
  const getContacts = async () => {
    const response = await api.get("contacts");

    return response.data;
  };

  const addContHandler = async (contact) => {
    //console.log(contact);
    //setContacts([...contacts, { id: uuidv4(), ...contact }]);

    const request = {
      //prepare contact with id
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request); //sending the data to api
    setContacts([...contacts, response.data]); // response contains the req
  };

  const UpdateContHandler = async (contact) => {
    //console.log(contact);
    //setContacts([...contacts, { id: uuidv4(), ...contact }]);

    const response = await api.put(`/contacts/${contact.id}`, contact); //sending the data to api
    setContacts(
      contacts.map((contact) => {
        return contact.id === response.data.id ? { ...response.data } : contact;
      })
    ); // response contains the req
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`); //removing a contact
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    //brings all contacts from db at the start
    const allContacts = async () => {
      const result = await getContacts();
      if (result) setContacts(result);
    };
    allContacts();
    //const result = JSON.parse(localStorage.getItem(LOCAL_KEY));
    //if (result) setContacts(result);
  }, []); //empty dependecy means it will only run once when loaded

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  // }, [contacts]); //useEffect runs whenever contacts is updated

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            // render={(props) => {
            //   <AddContact
            //     {...props}
            //     contact={contacts}
            //     getContactId={removeContactHandler}
            //   />;
            // }}
            element={<AddContact addContHandler={addContHandler} />}
          />
          <Route
            path="/edit"
            // render={(props) => {
            //   <AddContact
            //     {...props}
            //     contact={contacts}
            //     getContactId={removeContactHandler}
            //   />;
            // }}
            element={<EditContact updateContHandler={UpdateContHandler} />}
          />
          <Route
            path="/"
            // render={(props) => {
            //   <ContactList {...props} addContHandler={addContHandler} />;
            // }}
            element={
              <ContactList
                contact={contacts}
                getContactId={removeContactHandler}
              />
            }
          />
          <Route path="contact/:id" element={<ContactDetails />} />
        </Routes>
      </Router>

      {/* <AddContact addContHandler={addContHandler} />
      <ContactList contact={contacts} getContactId={removeContactHandler} /> */}
      {/* sending props: obj comps can receive props without mentioning */}
    </div>
  );
}

export default App;
