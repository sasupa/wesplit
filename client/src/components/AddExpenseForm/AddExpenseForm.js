import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./AddExpenseForm.css";
import axios from "axios";

const AddExpenseForm = (props) => {
  const [splitManually, setSplitManually] = useState(false);
  const [yourShare, setYourShare] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const groupMembers = props.group.members;
  console.log(groupMembers);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleYourShareChange = (event) => {
    const newMember2Share = amount - event.target.value;
    setYourShare(newMember2Share);
  };

  // Handle change in payment option
  const handlePaymentOptionChange = (event) => {
    setSplitManually(event.target.value === "manual division");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const shares = [];

    groupMembers.map((member, index) => {
      shares.push({
        shareholderId: member.userId._id,
        share:
          formData.get(member.userId._id.toString()) == ""
            ? Math.floor(amount / groupMembers.length)
            : formData.get(member.userId._id.toString()),
      });
    });

    const data = {
      creator: groupMembers[0].userId._id,
      description: formData.get("description"),
      amount: parseFloat(formData.get("amount")),
      payer: formData.get("payer"),
      divisionType: formData.get("divisionType"),
      shares: shares,
    };

    console.log("Expense submitted:", data);

    try {
      const response = await axios.post(
        `http://localhost:5100/wesplit/api/v1/transactions`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data; // You might want to return specific data from the response
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Something failed", error.message);
      // You might want to handle the error differently depending on your app's needs
      throw error;
    }
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
        <Form.Label htmlFor="payer">Payer</Form.Label>
        <Form.Control
          as="select"
          id="payer"
          name="payer"
          onChange={handlePaymentOptionChange}
        >
          {groupMembers.map((member, index) => (
            <option key={index} value={member.userId._id}>
              {member.userId.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="divisionType">Division</Form.Label>
        <Form.Control
          as="select"
          id="divisionType"
          name="divisionType"
          onChange={handlePaymentOptionChange}
        >
          <option value="split equally">Split equally</option>
          <option value="manual division">Enter split manually</option>
        </Form.Control>
      </Form.Group>

      {splitManually &&
        groupMembers.map((member, index) => (
          <>
            <Form.Group key={index}>
              <Form.Label htmlFor={member.userId._id}>
                {member.userId.name}:
              </Form.Label>
              <Form.Control
                type="number"
                id={member.userId._id}
                name={member.userId._id}
                placeholder={Math.floor(amount / groupMembers.length)}
                min="0"
                max={amount}
                step="0.01"
                onChange={handleYourShareChange}
              />
            </Form.Group>
          </>
        ))}

      <Button variant="primary" type="submit" className="mt-4 mb-4">
        Submit
      </Button>
    </Form>
  );
};

export default AddExpenseForm;
