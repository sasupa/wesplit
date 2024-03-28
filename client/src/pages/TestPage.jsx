import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const MyForm = () => {
  // Local states to keep track of the numbers
  const [totalAmount, setTotalAmount] = useState(0); // User set
  const [remainingAmount, setRemainingAmount] = useState(0); // Calculated
  const [participantAmounts, setParticipantAmounts] = useState([]); // User set

  // Total Amount change handler
  const handleTotalAmountChange = (e, setFieldValue) => {
    const newValue = parseFloat(e.target.value);

    // Update total amount and remaining amount
    setTotalAmount(newValue);

    //calculates the remaining sum. Reduce() subtracts all sums from an array
    const newRemainingAmount =
      newValue - participantAmounts.reduce((acc, curr) => acc + curr, 0);

    setRemainingAmount(newRemainingAmount);
    setFieldValue('totalAmount', newValue);
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Participant amount change handler
  const handleParticipantChange = (e, index, setFieldValue) => {
    const newParticipantAmounts = [...participantAmounts];
    const newValue = parseFloat(e.target.value);
    newParticipantAmounts[index] = newValue || 0; // If the value is empty, treat it as 0

    const newRemainingAmount =
      totalAmount - newParticipantAmounts.reduce((acc, curr) => acc + curr, 0);

    setRemainingAmount(newRemainingAmount);
    setParticipantAmounts(newParticipantAmounts);
    console.log(participantAmounts);
    setFieldValue(
      `participants[${index}].amount`,
      newParticipantAmounts[index]
    );
    setFieldValue('amountLeft', newRemainingAmount);
  };

  // Dummy members for dynamic rendering and naming – LATER
  const members = [
    { name: 'Member 1' },
    { name: 'Member 2' },
    // Add more members here dynamically if needed
  ];

  return (
    <Formik
      initialValues={{
        totalAmount: '',
        amountLeft: '',
        participants: Array(members.length).fill({ amount: 0 }),
      }}
      onSubmit={(values) => {
        console.log(values);
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
                value={participantAmounts[index] || ''}
                placeholder='0'
                onChange={(e) =>
                  handleParticipantChange(e, index, setFieldValue)
                }
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
