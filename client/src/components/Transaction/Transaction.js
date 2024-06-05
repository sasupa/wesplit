import React from "react";
import Toast from "react-bootstrap/Toast";
import { format } from 'date-fns';
import "./Transaction.css";
import "font-awesome/css/font-awesome.min.css";

const Transaction = ({ group, amount, description, date, shares, transaction }) => {
  const currentDate = new Date(date);
  const formattedDate = format(currentDate, 'EEEE dd.MM.yyyy');
  console.log(group)

  return (
    <Toast className="transaction-toast mb-2">
      <Toast.Header closeButton={false}>
        <strong>{formattedDate}, {description} paid by: {transaction.payer.name}</strong>
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
            {share.shareholderId.name} {share.share} 
          </span>
          <br></br>
          </div>
        ))}

      </Toast.Body>
    </Toast>
  );
};

export default Transaction;
