import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import '../components/NewExpenseComponents/MyForm.css'; // Import the CSS file

const MyForm = () => {
  // Local states to keep track of the numbers
  const [totalAmount, setTotalAmount] = useState(0); // User set
  const [remainingAmount, setRemainingAmount] = useState(0); // Calculated
  const [participantAmounts, setParticipantAmounts] = useState([]); // User set, containing IDs and amounts
  const [divisionType, setDivisionType] = useState('splitEqually'); // User set, containing IDs and amounts

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
    { id: 1, name: 'Sasu' },
    { id: 2, name: 'Taavi' },
    { id: 3, name: 'Jannerson' },
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
        divisionType: 'splitEqually',
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
        <Form className='form-container'>
          <div className='field-container'>
            <label htmlFor='totalAmount' className='label'>
              Total Amount:
            </label>
            <Field
              min='0'
              type='number'
              id='totalAmount'
              name='totalAmount'
              value={totalAmount === 0 ? '' : totalAmount}
              placeholder='0'
              onChange={(e) => handleTotalAmountChange(e, setFieldValue)}
              className='input'
            />
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
              onChange={(e) => setFieldValue('divisionType', e.target.value)}
            >
              <option value='splitEqually'>Split Equally</option>
              <option value='manualDivision'>Manual Division</option>
            </Field>
          </div>

          {/* Dynamic rendering of participant fields */}
          {values.divisionType === 'manualDivision' &&
            members.map((member, index) => (
              <div key={index} className='field-container'>
                <label
                  htmlFor={`participants.${index}.amount`}
                  className='label'
                >
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
                  className='input'
                />
              </div>
            ))}

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
            />
          </div>

          <button
            type='submit'
            disabled={remainingAmount !== 0}
            className='button'
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
