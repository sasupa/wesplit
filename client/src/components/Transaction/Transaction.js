import React from "react";
import Toast from "react-bootstrap/Toast";
import "./Transaction.css";
import "font-awesome/css/font-awesome.min.css";

const Transaction = ({ amount, description, date, shares }) => {
  return (
    <Toast className="transaction-toast mb-2">
      <Toast.Header closeButton={false}>
        <strong>{date}</strong>
      </Toast.Header>
      <Toast.Body>
        <i className="fa fa-money" aria-hidden="true"></i>
        <span className="user-margin">
          <strong>
            {description}: {amount}
          </strong>
        </span>
        <br></br>

        {shares.map((share, index) => (
          <div key={index}>
          <i className="fa fa-money" aria-hidden="true"></i>
          <span className="user-margin">
            {share.userId}: {share.share.$numberDecimal} 
          </span>
          <br></br>
          </div>
        ))}

      </Toast.Body>
    </Toast>
  );
};

export default Transaction;
