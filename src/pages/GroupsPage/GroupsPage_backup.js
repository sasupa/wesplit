import React, { useEffect, useState } from "react";
import { fetchGroups } from "../../utils/apiUtils";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroups()
      .then(setGroups)
      .catch((error) => {
        console.error("Fetching groups failed: ", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!");
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Your Groups</h1>
      <LoadingSpinner />
      <Footer />
    </Container>
  );
};

export default GroupsPage;
