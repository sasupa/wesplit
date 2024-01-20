import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGroupWithGroupId,
  fetchGroupTransactions,
} from "../../utils/apiUtils";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer.js";
import UserCard from "../../components/UserCard/UserCard.js";
import AddUserCard from "../../components/AddUserCard/AddUserCard.js";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm.js";
import Transaction from "../../components/Transaction/Transaction.js";
import "font-awesome/css/font-awesome.min.css";
import "./GroupPage.css";
import { Context } from "../../Context.js";

const GroupPage = () => {
  const { contextValue, updateContextValue } = useContext(Context);
  const [error, setError] = useState(null);
  const { groupId } = useParams(); // Get the groupId from URL

  useEffect(() => {
    fetchGroupWithGroupId(groupId)
      .then((data) => {
        let newState = [...contextValue];
        newState[newState.length - 1] = data.group;
        console.log(data.group);
        updateContextValue(newState);
      })
      .catch((error) => {
        console.error("Fetching groups failed: ", error);
        setError(error.message);
      });
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-3">
        <h1 className="text-center mb-4">
          <i className="fa fa-users icon-space" aria-hidden="true"></i>
          {contextValue[2].name}
        </h1>

        {contextValue[2].members.map((member, index) => (
          <UserCard
            key={index}
            username={member.userId.name}
            balance={parseFloat(member.balance)}
          />
        ))}

        <AddUserCard />
      </Row>

      {/* Add Expense */}
      <Row className="justify-content-center mb-3">
        <Col md={6} className="form-bg p-4 m-3">
          <h2>Add an expense</h2>
          <AddExpenseForm group={contextValue[2]} />
        </Col>
      </Row>

      {/* Transactions List */}
      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <h2>Latest transactions in {contextValue[2].name}</h2>
          <br></br>
          {contextValue[2].transactions.map((transaction, index) => (
            <Transaction
              key={index}
              date={transaction.createdAt}
              amount={parseFloat(transaction.amount.$numberDecimal)}
              description={transaction.description}
              shares={transaction.shares}
            />
          ))}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default GroupPage;
