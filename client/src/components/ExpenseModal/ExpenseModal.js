import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import _ from 'lodash';
import { Formik, Form, Field } from 'formik';
import './ExpenseModal.css';
import { createTransaction } from '../../utils/apiUtils';

const ExpenseModal = ({ show, handleClose, group, user }) => {
  // Local states to keep track of the numbers
  const [amount, setAmount] = useState(0); // User set
  const [remainingAmount, setRemainingAmount] = useState(0); // Calculated
  const [participantAmounts, setParticipantAmounts] = useState([]); // User set, containing IDs and amounts
  const [divisionType, setDivisionType] = useState('splitEqually'); // User set, containing IDs and amounts

  // Dummy members for dynamic rendering and naming – LATER
  const members = [];
  group.members.map((member) => {
    members.push({ id: member.userId._id, name: member.userId.name });
  });

  // Total Amount change handler
  const handleTotalAmountChange = (e, setFieldValue) => {
    const newValue = parseFloat(e.target.value);

    // Update total amount and remaining amount
    setAmount(newValue);

    // Calculates the remaining sum. Reduce() subtracts all sums from an array
    const newRemainingAmount =
      newValue - participantAmounts.reduce((acc, curr) => acc + curr.share, 0);

    const fixedNewRemainingAmount = Number(newRemainingAmount.toFixed(2));
    setRemainingAmount(fixedNewRemainingAmount);
    setFieldValue('amount', newValue);
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Participant amount change handler
  const handleParticipantChange = (e, index, setFieldValue) => {
    const newParticipantAmounts = [...participantAmounts];
    const newValue = parseFloat(e.target.value);

    // Update participant amount
    newParticipantAmounts[index].share = newValue || 0; // If the value is empty, treat it as 0

    // Recalculate remaining amount
    const newRemainingAmount =
      amount - newParticipantAmounts.reduce((acc, curr) => acc + curr.share, 0);

    const fixedNewRemainingAmount = Number(newRemainingAmount.toFixed(2));
    setRemainingAmount(fixedNewRemainingAmount);
    setParticipantAmounts(newParticipantAmounts);
    setFieldValue(
      `participants.${index}.share`,
      newParticipantAmounts[index].share
    );
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Initialize participant amounts with IDs and zero amounts
  useState(() => {
    setParticipantAmounts(
      members.map((member) => ({ shareholderId: member.id, share: 0 }))
    );
  }, []);

  return (
    <Modal show={show} onHide={handleClose} group={group}>
      <Modal.Header closeButton>
        <Modal.Title>Add new expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            description: '',
            amount: '',
            group: group._id,
            creator: user._id,
            payer: group.members[0].userId._id,
            amountLeft: '',
            shares: participantAmounts,
            divisionType: 'split equally',
          }}
          onSubmit={async (values, { resetForm }) => {
            // Calculate the amount each participant should receive if split equally
            const equalAmount =
              values.divisionType === 'split equally'
                ? values.amount / values.shares.length
                : 0;

            // Update participant amounts with the equal amount if split type is 'split equally'
            const updatedParticipantAmounts = values.shares.map(
              (participant) => ({
                ...participant,
                share:
                  values.divisionType === 'split equally'
                    ? equalAmount.toFixed(2)
                    : participant.share,
              })
            );

            // Prepare the data to be sent to the backend
            const formData = {
              description: values.description,
              amount: values.amount,
              divisionType: values.divisionType,
              group: group._id,
              creator: user._id,
              payer: values.payer,
              shares: updatedParticipantAmounts,
            };

            try {
              const data = await createTransaction(formData);
              console.log(data);
              // Reset the form after successful submission
              setAmount(0);
              setRemainingAmount(0);
              setParticipantAmounts(
                updatedParticipantAmounts.map((participant) => ({
                  shareholderId: participant.id,
                  share: 0,
                }))
              );
              resetForm();
              toast.success('Expense added!');
              handleClose();
            } catch (error) {
              toast.error(error?.response?.data?.msg);
              resetForm();
              return error;
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className='form-container'>
              <div className='field-container'>
                <label htmlFor='Description' className='label'>
                  Description:
                </label>
                <Field
                  type='text'
                  id='description'
                  name='description'
                  placeholder="What's the expense?"
                  className='input'
                />
              </div>
              <div className='field-container'>
                <label htmlFor='amount' className='label'>
                  Total Amount:
                </label>
                <Field
                  min='0'
                  type='number'
                  id='amount'
                  name='amount'
                  value={amount === 0 ? '' : amount}
                  placeholder='0'
                  onChange={(e) => handleTotalAmountChange(e, setFieldValue)}
                  className='input'
                  step='0.01' // Allows decimal increments of 0.01
                />
              </div>

              {/* Select field for payer */}
              <div className='field-container'>
                <label htmlFor='payer' className='label'>
                  Payer:
                </label>
                <Field
                  as='select'
                  id='payer'
                  name='payer'
                  className='input select'
                  onChange={(e) => setFieldValue('payer', e.target.value)}
                >
                  {group.members.map((member, index) => {
                    return (
                      <option key={index} value={member.userId._id}>
                        {member.userId.name}
                      </option>
                    );
                  })}
                </Field>
              </div>

              {/* Select field for division type */}
              <div className='field-container'>
                <label htmlFor='divisionType' className='label'>
                  Division Type:
                </label>
                <Field
                  as='select'
                  id='divisionType'
                  name='divisionType'
                  className='input select'
                  onChange={(e) =>
                    setFieldValue('divisionType', e.target.value)
                  }
                >
                  <option value='split equally'>Split Equally</option>
                  <option value='manual division'>Manual Division</option>
                </Field>
              </div>

              {/* Dynamic rendering of participant fields */}
              {values.divisionType === 'manual division' &&
                members.map((member, index) => (
                  <div key={index} className='field-container'>
                    <label
                      htmlFor={`participants.${index}.share`}
                      className='label'
                    >
                      {member.name} Share:
                    </label>
                    <Field
                      type='number'
                      id={`participants.${index}.share`}
                      name={`participants.${index}.share`}
                      value={participantAmounts[index].share || ''}
                      placeholder='0'
                      onChange={(e) =>
                        handleParticipantChange(e, index, setFieldValue)
                      }
                      inputMode='numeric'
                      className='input'
                      step='0.01' // Allows decimal increments of 0.01
                    />
                  </div>
                ))}
              {values.divisionType === 'manual division' ? (
                <div className='field-container'>
                  <label htmlFor='amountLeft' className='label'>
                    Amount Left:
                  </label>
                  <Field
                    type='number'
                    id='amountLeft'
                    name='amountLeft'
                    value={remainingAmount}
                    disabled
                    className='input-disable'
                    step='0.01' // Allows decimal increments of 0.01
                  />
                </div>
              ) : null}

              <button
                type='submit'
                disabled={
                  values.divisionType === 'manual division' &&
                  remainingAmount !== 0
                }
                className='button'
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
