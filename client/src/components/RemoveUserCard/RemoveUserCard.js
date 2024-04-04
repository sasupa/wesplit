import React from "react";
import Toast from "react-bootstrap/Toast";
import "./RemoveUserCard.css";

const RemoveUserCard = ({ id, username, remove }) => {
  const handleClick = () => {
    remove(id, username);
  }

  return (
    <Toast className="user-toast" bg="danger" onClick={handleClick}>
      <Toast.Body>
          <strong className="me-auto remove-font">Remove {username}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default RemoveUserCard;
