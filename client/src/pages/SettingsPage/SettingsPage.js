// ExpensePage.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from "../../components/Footer/Footer";

const SettingsPage = () => {
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!");
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Settings</h1>
    <Footer />
    </Container>
  );
};

export default SettingsPage;
