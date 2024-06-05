import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchGroupWithGroupId,
  addUserToGroup,
  RemoveMemberFromGroup,
} from "../../utils/apiUtils";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer.js";
import UserCard from "../../components/UserCard/UserCard.js";
import RemoveUserCard from "../../components/RemoveUserCard/RemoveUserCard.js";
import AddUserCard from "../../components/AddUserCard/AddUserCard.js";
import Transaction from "../../components/Transaction/Transaction.js";
import "font-awesome/css/font-awesome.min.css";
import "./GroupPage.css";
import ExpenseModal from "../../components/ExpenseModal/ExpenseModal.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.js";
import { useOutletContext } from 'react-router-dom';

const GroupPage = () => {
  const user = useOutletContext();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRemove, setShowRemove] = useState(false);
  const [group, setGroup] = useState();
  const { groupId } = useParams(); // Get the groupId from URL

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const handleShowRemoveUser = () => {
    setShowRemove(true);
  };
  const handleRemoveUser = (id, username) => {
    let sure = window.confirm(
      "Are you sure you want to remove " + username + "?"
    );
    setLoading(true);
    function findMemberBalanceById(members, searchId) {
      for (const member of members) {
        if (member.userId._id === searchId) {
          console.log(parseFloat(member.balance));
          if (parseFloat(member.balance) != 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
    let balance = findMemberBalanceById(group.members, id);
    if (sure && balance) {
      RemoveMemberFromGroup(groupId, id)
        .then((data) => {
          console.log(data.data);
          setGroup(data.data);
          setShowRemove(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetching groups failed: ", error);
          setError(error.message);
          setShowRemove(false);
          setLoading(false);
        });
    } else if (sure && !balance) {
      alert("Can't remove a member with outstanding balance");
      setShowRemove(false);
    } else {
      setShowRemove(false);
    }
  };
  const handleAddUser = () => {
    let userId = prompt("Give the ID");
    if (userId === null) {
      return;
    }
    setLoading(true);
    addUserToGroup(groupId, userId)
      .then((data) => {
        setGroup(data.data);
        console.log(data.data);
        setShowRemove(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching groups failed: ", error);
        setError(error.message);
        setShowRemove(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGroupWithGroupId(groupId)
      .then((data) => {
        setGroup(data.group);
        setLoading(false);
        /*
        let newState = [...contextValue];
        newState[newState.length - 1] = data.group;
        updateContextValue(newState);
        console.log(newState);*/
      })
      .catch((error) => {
        console.error("Fetching groups failed: ", error);
        setError(error.message);
      });
  }, []);

  if (!loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center mb-3">
          <Col md={8} lg={6}>
            <h1 className="text-center mb-4">
              <i className="fa fa-users icon-space" aria-hidden="true"></i>
              {group.name}
            </h1>

            {group.members.map((member, index) =>
              !showRemove ? (
                <UserCard
                  key={index}
                  username={member.userId?.name || "Loading..."}
                  balance={parseFloat(member.balance)}
                  showRemove={handleShowRemoveUser}
                />
              ) : (
                <RemoveUserCard
                  key={index}
                  id={member.userId?._id || "Loading..."}
                  username={member.userId.name}
                  remove={handleRemoveUser}
                />
              )
            )}

            <AddUserCard addUser={handleAddUser} />
          </Col>
        </Row>

        {/* Add Expense */}
        <Row className="justify-content-center mb-3">
          <Col md={8} lg={6} className="mx-auto">
            <Button variant="primary" onClick={handleShow}>
              Add new expense
            </Button>
            <ExpenseModal
              show={show}
              handleClose={handleClose}
              navigate={navigate}
              group={group}
              user={user}
              /*
          group={contextValue[2]}*/
            />
          </Col>
        </Row>

        {/* Transactions List */}
        <Row className="justify-content-center">
          <Col className="justify-content-center" xs={10} md={8} lg={6}>
            <h2>Latest transactions in {group.name}</h2>
            <br></br>
            {group.transactions.map((transaction, index) => (
              <Transaction
                key={index}
                date={transaction.createdAt}
                amount={transaction.amount}
                description={transaction.description}
                shares={transaction.shares}
                transaction={transaction}
                group={group}
              />
            ))}
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  } else {
    return (
      <Container className="py-5">
        <LoadingSpinner />
        <Footer />
      </Container>
    );
  }
};

export default GroupPage;
