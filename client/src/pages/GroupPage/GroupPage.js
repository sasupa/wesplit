import React, { useEffect, useState } from "react";
import { fetchGroups, fetchGroupTransactions } from "../../utils/apiUtils";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer.js";
import UserCard from "../../components/UserCard/UserCard.js";
import AddUserCard from "../../components/AddUserCard/AddUserCard.js";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm.js";
import Transaction from "../../components/Transaction/Transaction.js";
import "font-awesome/css/font-awesome.min.css";
import "./GroupPage.css";

const GroupPage = () => {
  {
    /* JÄI KESKEN, PITÄÄ TEHDÄ REITTI JOLLA HAKEE GROUPIN VAIKKA LOCAL STORAGEEN TAI STATEEN JA SIT POPULOI SIVUN
    /* group must be added to AddExpense as a prop – this is just a demo  */
  }
  const group = {
    name:"Muppelo",
    member1: "Sasu",
    member1balance: 25.4,
    member2: "Anni",
    member2balance: 100,
    transactions: [
      {
        description: "Prisma",
        amount: 83.54,
        paymentOption: "paidByYou",
        yourShare: 41.77,
        member2Share: 41.77,
      },
      {
        description: "Clas Ohlson",
        amount: 54.3,
        paymentOption: "enterSplitManually",
        yourShare: 10,
        member2Share: 44.3,
      },
    ],
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-3">
        <h1 className="text-center mb-4">
          <i className="fa fa-users icon-space" aria-hidden="true"></i>{group.name}
        </h1>
        <UserCard username={group.member1} balance={group.member1balance} />
        <UserCard username={group.member2} balance={group.member2balance} />
        <AddUserCard />
      </Row>

      {/* Add Expense */}
      <Row className="justify-content-center mb-3">
        <Col md={6} className="form-bg p-4 m-3">
          <h2>Add an expense</h2>
          <AddExpenseForm group={group} />
        </Col>
      </Row>

      {/* Transactions List */}
      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <h2>Latest transactions in {group.name}</h2>
          <br></br>
          {group.transactions.map((transaction, index) => (
            <Transaction
              key={index}
              amount={transaction.amount}
              description={transaction.description}
            />
          ))}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default GroupPage;
