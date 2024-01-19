import React, { useEffect, useState } from "react";
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

const GroupPage = () => {
  const [group, setGroup] = useState({name: null, members:[], transactions: []});
  const [error, setError] = useState(null);
  const { groupId } = useParams(); // Get the groupId from URL

  useEffect(() => {
    fetchGroupWithGroupId(groupId)
      .then((data) => {
        console.log(data.group);
        setGroup(data.group);
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
          {group.name}
        </h1>

        {group.members.map((member, index) => (
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
