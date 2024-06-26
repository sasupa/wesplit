import React from "react";
import Toast from "react-bootstrap/Toast";
import "./AddUserCard.css";
import "font-awesome/css/font-awesome.min.css";

const AddUserCard = ({ addUser }) => {
  return (
    <Toast className="user-toast" onClick={addUser}>
      <Toast.Body>
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        <span className="user-margin"><strong className="me-auto">Add a member</strong></span>
      </Toast.Body>
    </Toast>
  );
};

export default AddUserCard;
