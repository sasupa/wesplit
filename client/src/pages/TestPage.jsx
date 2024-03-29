import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const MyForm = () => {
  // Local states to keep track of the numbers
  const [totalAmount, setTotalAmount] = useState(0); // User set
  const [remainingAmount, setRemainingAmount] = useState(0); // Calculated
  const [participantAmounts, setParticipantAmounts] = useState([]); // User set, containing IDs and amounts

  // Total Amount change handler
  const handleTotalAmountChange = (e, setFieldValue) => {
    const newValue = parseFloat(e.target.value);

    // Update total amount and remaining amount
    setTotalAmount(newValue);

    // Calculates the remaining sum. Reduce() subtracts all sums from an array
    const newRemainingAmount =
      newValue - participantAmounts.reduce((acc, curr) => acc + curr.amount, 0);

    setRemainingAmount(newRemainingAmount);
    setFieldValue('totalAmount', newValue);
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Participant amount change handler
  const handleParticipantChange = (e, index, setFieldValue) => {
    const newParticipantAmounts = [...participantAmounts];
    const newValue = parseFloat(e.target.value);

    // Update participant amount
    newParticipantAmounts[index].amount = newValue || 0; // If the value is empty, treat it as 0

    // Recalculate remaining amount
    const newRemainingAmount =
      totalAmount -
      newParticipantAmounts.reduce((acc, curr) => acc + curr.amount, 0);

    setRemainingAmount(newRemainingAmount);
    setParticipantAmounts(newParticipantAmounts);
    setFieldValue(
      `participants.${index}.amount`,
      newParticipantAmounts[index].amount
    );
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Dummy members for dynamic rendering and naming – LATER
  const members = [
    { id: 1, name: 'Member 1' },
    { id: 2, name: 'Member 2' },
    { id: 3, name: 'Member 3' },
    // Add more members here dynamically if needed
  ];

  // Initialize participant amounts with IDs and zero amounts
  useState(() => {
    setParticipantAmounts(
      members.map((member) => ({ id: member.id, amount: 0 }))
    );
  }, []);

  return (
    <Formik
      initialValues={{
        totalAmount: '',
        amountLeft: '',
        participants: participantAmounts,
      }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        // Perform any submission logic here
        // Then reset the form
        setTotalAmount(0);
        setRemainingAmount(0);
        setParticipantAmounts(
          participantAmounts.map((participant) => ({
            id: participant.id,
            amount: 0,
          }))
        );
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor='totalAmount'>Total Amount:</label>
            <Field
              min='0'
              type='number'
              id='totalAmount'
              name='totalAmount'
              value={totalAmount === 0 ? '' : totalAmount}
              placeholder='0'
              onChange={(e) => handleTotalAmountChange(e, setFieldValue)}
            />
          </div>

          {/* Dynamic rendering of participant fields */}
          {members.map((member, index) => (
            <div key={index}>
              <label htmlFor={`participants.${index}.amount`}>
                {member.name} Amount:
              </label>
              <Field
                type='number'
                id={`participants.${index}.amount`}
                name={`participants.${index}.amount`}
                value={participantAmounts[index].amount || ''}
                placeholder='0'
                onChange={(e) =>
                  handleParticipantChange(e, index, setFieldValue)
                }
                inputMode='numeric'
                pattern='[0-9]*'
                onKeyPress={(e) => {
                  // Allow only numeric input, backspace, and arrow keys
                  const allowedKeys = [
                    'Backspace',
                    'ArrowLeft',
                    'ArrowRight',
                    'ArrowUp',
                    'ArrowDown',
                  ];
                  if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          ))}

          <div>
            <label htmlFor='amountLeft'>Amount Left:</label>
            <Field
              type='number'
              id='amountLeft'
              name='amountLeft'
              value={remainingAmount}
              disabled
            />
          </div>

          <button type='submit' disabled={remainingAmount !== 0}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
