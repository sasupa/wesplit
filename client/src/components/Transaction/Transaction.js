import React from "react";
import Toast from "react-bootstrap/Toast";
import "./Transaction.css";
import "font-awesome/css/font-awesome.min.css";

const Transaction = ({ amount, description }) => {

  return (
    <Toast className="transaction-toast mb-2">
        <Toast.Header closeButton={false}>
            <strong>{description}: {amount}</strong>
        </Toast.Header>
      <Toast.Body>
        <i className="fa fa-money" aria-hidden="true"></i>
        <span className="user-margin"><strong className="me-auto">Sasu: X</strong></span><br></br>
        <i className="fa fa-money" aria-hidden="true"></i>
        <span className="user-margin"><strong className="me-auto">Anni: Y</strong></span>
      </Toast.Body>
    </Toast>
  );
};

export default Transaction;