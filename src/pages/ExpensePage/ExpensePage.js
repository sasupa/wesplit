// ExpensePage.js
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";

const ExpensePage = () => {
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!");
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Expense Entry to group Muppelo</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="description">Description:</Form.Label>
              <Form.Control
                type="text"
                id="description"
                name="description"
                placeholder="Enter a description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="amount">Amount (€):</Form.Label>
              <Form.Control
                type="number"
                id="amount"
                name="amount"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="paymentOption">Payment Option:</Form.Label>
              <Form.Control as="select" id="paymentOption" name="paymentOption">
                <option value="paidByYou">Paid by you and split equally</option>
                <option value="paidByOther">
                  Paid by other and split equally
                </option>
                <option value="enterSplitManually">Enter split manually</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Transactions List */}
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Latest transactions in this group</h2>
          <ul id="transactionsList" className="list-group">
            {/* Transactions would be dynamically listed here */}
          </ul>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default ExpensePage;
