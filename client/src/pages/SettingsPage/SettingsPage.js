// ExpensePage.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from "../../components/Footer/Footer";
import { useOutletContext } from 'react-router-dom';

const SettingsPage = () => {
  const user = useOutletContext();
  console.log(user)

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Settings</h1>
      <div>User: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Change password</div>
    <Footer />
    </Container>
  );
};

export default SettingsPage;
