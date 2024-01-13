// ExpensePage.js
import React, { useEffect, useState } from "react";
import { fetchGroups } from "../../utils/apiUtils";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import GroupCard from "../../components/GroupCard/GroupCard";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  {/*  USE DUMMY DATA IN DEV MODE  */ }
  useEffect(() => {
    setLoading(false);
    setGroups([
      {
        _id: "6590143d103731c6c46a9d9a",
        member1: "658f3de6ed16c6a94e7db63e",
        member1balance: {
          $numberDecimal: "0.00",
        },
        member2: "658f56e4a2246dc94277dcb8",
        member2confirmed: false,
        member2balance: {
          $numberDecimal: "0.00",
        },
        name: "Muppelo",
      },
    ]);
  },[]);

  {/* THIS IS FOR PRODUCTION
  useEffect(() => {
    fetchGroups()
      .then((data) => {
        setGroups(data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Fetching groups failed: ", error);
        setError(error.message);
        setLoading(false); // Set loading to false even when there's an error
      });
  }, []);
*/}

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Your Groups</h1>

      {loading ? (
        <LoadingSpinner /> // Show loading spinner when loading
      ) : error ? (
        <div>Error: {error}</div> // Show error message if there's an error
      ) : (
        <div>
          {/* Display groups result */}
          {groups.map((group) => (
            <GroupCard
              groupId={group._id}
              groupName={group.name}
              members={[
                { name: "Member1", balance: 20 },
                { name: "Member2", balance: -10 },
              ]}
            />
          ))}
        </div>
      )}

      <Footer />
    </Container>
  );
};

export default GroupsPage;
