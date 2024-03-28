import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import '../components/LoginForm/LoginForm.css';

const MyForm = () => {
  // 3 Local states to keep track of the numbers
  const [totalAmount, setTotalAmount] = useState(0); //user set
  const [remainingAmount, setRemainingAmount] = useState(0); //calculated
  const [participantAmount, setParticipantAmount] = useState(0); //user set. Tästä dynaaminen array

  //********* TOTAL AMOUNT *******//
  const handleTotalAmountChange = (e, setFieldValue) => {
    const newValue = parseFloat(e.target.value);

    //Handling total amount
    setTotalAmount(newValue);
    setRemainingAmount(newValue);
    setFieldValue('totalAmount', newValue);

    //Resetting participant value when total changes for UX reasons
    setParticipantAmount(0);
    setFieldValue('participantAmount', 0);
  };

  //********* USER AMOUNTS *******//
  const handleParticipantChange = (e, setFieldValue) => {
    // Declaring *all* required variables
    const participantAmount = parseFloat(e.target.value);
    const newRemainingAmount = totalAmount - participantAmount;

    // Updating states and userfields
    setRemainingAmount(newRemainingAmount);
    setParticipantAmount(participantAmount);
    setFieldValue('amountLeft', newRemainingAmount);
    setFieldValue('participantAmount', participantAmount);

    //LATER: DYNAMIC UPDATING BASED ON THE FIELD ID (i.e. right field & remaining amounts are updated)

    const elementID = e.target.id; //Getting the id of the field that was changed
    const newValue = e.target.value; //Getting the changed value for state and fieldset

    // --> setFieldValue(elementID, newValue)
    // --> setParticipantAmount (iteroituvasti)
  };

  //Dummy members for dynamic rendering and naming – LATER
  const members = [
    {
      name: 'kissa',
      share: '',
    },
    {
      name: 'kassa',
      share: '',
    },
  ];

  // **** DYNAMIC RENDERING TEMPLATE FOR LATER –– WORKS *****

  // const dynamicUserInputFields = members.map((member, index) => (
  //   <div>
  //     <label htmlFor='participantAmount'>Participant Amount:</label>
  //     <Field
  //       type='number'
  //       id={`participantAmount+${member.name}`}
  //       name='participantAmount'
  //       value={participantAmount === 0 ? '' : participantAmount}
  //       placeholder='0'
  //       onChange={(e) => handleParticipantChange(e, setFieldValue)}
  //     />
  //   </div>
  // ));

  return (
    <Formik
      initialValues={{ totalAmount: 0, amountLeft: 0, participantAmount: 0 }}
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

          {/* Other fields for participants */}

          {/* DYNAMIC TEMPLATE FOR LATER  | MAPPING DONE ABOVE */}
          {/* <div>{dynamicUserInputFields}</div> */}

          <div>
            <label htmlFor='participantAmount'>Participant Amount:</label>
            <Field
              type='number'
              id={`participantAmount`}
              name='participantAmount'
              value={participantAmount === 0 ? '' : participantAmount}
              placeholder='0'
              onChange={(e) => handleParticipantChange(e, setFieldValue)}
            />
          </div>

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

          <button type='submit' disabled={remainingAmount !== 0 ? true : false}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
