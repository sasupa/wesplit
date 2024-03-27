import React from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import NewExpenseForm from "./NewNewExpenseForm";
import { toast } from "react-toastify";
import _ from 'lodash';

const ExpenseModal = ({ show, handleClose, navigate, group }) => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    const shares = [];
    let manualSum = 0;
    const keyValuePairs = Object.entries(values);

    for (let i = 0; i < group.members.length; i++) {
      // This ensures you're accessing valid indices of keyValuePairs from the end
      manualSum = manualSum + keyValuePairs[keyValuePairs.length - 1 - i][1];
      shares.push(keyValuePairs[keyValuePairs.length - 1 - i]);
    }

    const data = {
      creator: "ota ID vaikka keksistä",
      group: group._id,
      description: values.description,
      amount: values.amount,
      payer: values.payer,
      divisionType: values.divisionType,
      shares: shares,
    };

    /*
    SITTEN KUN TOIMII

    try {
      console.log("Form values:", data);
      toast.success("Expense added ✅ ");
      resetForm();
      handleClose();
      navigate("/groups"); // add navigation to the same group when merging
    } catch (err) {
      console.log(err);
    }

    */

  };

  const initialValues = {
    creator: "",
    group: group._id,
    description: '',
    amount: '',
    payer: '',
    divisionType: '',
    shares: group.members.reduce((acc, member) => {
      acc[member.userId._id] = ''; // Initialize each share as an empty string or zero
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive')
      .test('sum-of-shares', 'The sum of member contributions must equal the total amount', function(value) {
        // This test only applies when divisionType is 'manual division'
        if (this.parent.divisionType !== 'manual division') {
          return true; // Skip the test if not 'manual division'
        }
  
        const shares = this.parent.shares || {};
        const sharesSum = _.sum(Object.values(shares).map(Number)); // Using Number for conversion
        console.log({ shares, sharesSum, amount: value }); // Debugging output
  
        return sharesSum === value; // Compare the sum of shares to the amount field
      }),
    payer: Yup.string().required('Payer is required'),
    divisionType: Yup.string().required('Division type is required'),
    // Define shares as an object, but no conditional testing within it
    shares: Yup.object(),
  }).required();

  return (
    <Modal show={show} onHide={handleClose} group={group}>
      <Modal.Header closeButton>
        <Modal.Title>Add new expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewExpenseForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={validationSchema}
          group={group}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
