import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './AddExpenseForm.css';

const AddExpenseForm = (props) => {
  const [splitManually, setSplitManually] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [member2Share, setYourShare] = useState(0.0);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleYourShareChange = (event) => {
    const newMember2Share = amount - event.target.value;
    setYourShare(newMember2Share);
  };

  // Handle change in payment option
  const handlePaymentOptionChange = (event) => {
    setSplitManually(event.target.value === "enterSplitManually");
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      description: formData.get("description"),
      amount: parseFloat(formData.get("amount")),
      paymentOption: formData.get("paymentOption"),
      yourShare:
        formData.get("yourShare") == null
          ? parseFloat(formData.get("amount")) / 2
          : parseFloat(formData.get("yourShare")),
      member2Share:
        formData.get("member2Share") == null
          ? parseFloat(formData.get("amount")) / 2
          : parseFloat(formData.get("member2Share")),
    };
    console.log("Expense submitted:", data);
  };

  return (
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
          onChange={handleAmountChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="paymentOption">Payment Option:</Form.Label>
        <Form.Control
          as="select"
          id="paymentOption"
          name="paymentOption"
          onChange={handlePaymentOptionChange}
        >
          <option value="paidByYou">Paid by you and split equally</option>
          <option value="paidByOther">
            Paid by {props.group.member2} and split equally
          </option>
          <option value="enterSplitManually">Enter split manually</option>
        </Form.Control>
      </Form.Group>

      {splitManually && (
        <>
          <Form.Group>
            <Form.Label htmlFor="yourShare">Your Share (€):</Form.Label>
            <Form.Control
              type="number"
              id="yourShare"
              name="yourShare"
              placeholder="0.00"
              min="0"
              max={amount}
              step="0.01"
              onChange={handleYourShareChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="member2Share">
              {props.group.member2} (€):
            </Form.Label>
            <Form.Control
              type="number"
              id="member2Share"
              name="member2Share"
              placeholder="0.00"
              value={member2Share}
              min="0"
              step="0.01"
              readOnly
            />
          </Form.Group>
        </>
      )}
      <Button variant="primary" type="submit" className="mt-4 mb-4">
        Submit
      </Button>
    </Form>
  );
};

export default AddExpenseForm;