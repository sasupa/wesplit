import React from "react";
import Toast from "react-bootstrap/Toast";
import "./UserCard.css";

const UserCard = ({ username, balance, avatarUrl, showRemove }) => {
  return (
    <Toast className="user-toast" onClick={showRemove}>
      <Toast.Body>
        <img src="https://picsum.photos/20" className="rounded me-2" alt="" />
        <span className="user-margin">
          <strong className="me-auto">{username}</strong>
        </span>
        <small>Balance: {balance} €</small>
      </Toast.Body>
    </Toast>
  );
};

export default UserCard;
