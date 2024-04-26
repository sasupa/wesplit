import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "../components/ExpenseModal/MyForm.css"; // Import the CSS file

const MyForm = () => {
  // Local states to keep track of the numbers
  const [totalAmount, setTotalAmount] = useState(0); // User set
  const [remainingAmount, setRemainingAmount] = useState(0); // Calculated
  const [participantAmounts, setParticipantAmounts] = useState([]); // User set, containing IDs and amounts
  const [divisionType, setDivisionType] = useState("splitEqually"); // User set, containing IDs and amounts

  // Total Amount change handler
  const handleTotalAmountChange = (e, setFieldValue) => {
    const newValue = parseFloat(e.target.value);

    // Update total amount and remaining amount
    setTotalAmount(newValue);

    // Calculates the remaining sum. Reduce() subtracts all sums from an array
    const newRemainingAmount =
      newValue - participantAmounts.reduce((acc, curr) => acc + curr.amount, 0);

    const fixedNewRemainingAmount = Number(newRemainingAmount.toFixed(2));
    setRemainingAmount(fixedNewRemainingAmount);
    setFieldValue("totalAmount", newValue);
    setFieldValue("amountLeft", newRemainingAmount);
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

    const fixedNewRemainingAmount = Number(newRemainingAmount.toFixed(2));
    setRemainingAmount(fixedNewRemainingAmount);
    setParticipantAmounts(newParticipantAmounts);
    setFieldValue(
      `participants.${index}.amount`,
      newParticipantAmounts[index].amount
    );
    setFieldValue("amountLeft", newRemainingAmount);
  };

  // Dummy members for dynamic rendering and naming – LATER
  const members = [
    { id: 1, name: "Sasu" },
    { id: 2, name: "Taavi" },
    { id: 3, name: "Jannerson" },
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
        totalAmount: "",
        amountLeft: "",
        participants: participantAmounts,
        divisionType: "splitEqually",
      }}
      onSubmit={(values, { resetForm }) => {
        // Calculate the amount each participant should receive if split equally
        const equalAmount =
          values.divisionType === "splitEqually"
            ? values.totalAmount / values.participants.length
            : 0;

        // Update participant amounts with the equal amount if split type is 'split equally'
        const updatedParticipantAmounts = values.participants.map(
          (participant) => ({
            ...participant,
            amount:
              values.divisionType === "splitEqually"
                ? equalAmount.toFixed(2)
                : participant.amount,
          })
        );

        // Prepare the data to be sent to the backend
        const formData = {
          totalAmount: values.totalAmount,
          splitType: values.divisionType,
          participants: updatedParticipantAmounts,
        };

        console.log(formData);

        // Reset the form after successful submission
        setTotalAmount(0);
        setRemainingAmount(0);
        setParticipantAmounts(
          updatedParticipantAmounts.map((participant) => ({
            id: participant.id,
            amount: 0,
          }))
        );
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="form-container">
          <div className="field-container">
            <label htmlFor="totalAmount" className="label">
              Total Amount:
            </label>
            <Field
              min="0"
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={totalAmount === 0 ? "" : totalAmount}
              placeholder="0"
              onChange={(e) => handleTotalAmountChange(e, setFieldValue)}
              className="input"
              step="0.01" // Allows decimal increments of 0.01
            />
          </div>

          {/* Select field for division type */}
          <div className="field-container">
            <label htmlFor="divisionType" className="label">
              Division Type:
            </label>
            <Field
              as="select"
              id="divisionType"
              name="divisionType"
              className="input select"
              onChange={(e) => setFieldValue("divisionType", e.target.value)}
            >
              <option value="splitEqually">Split Equally</option>
              <option value="manualDivision">Manual Division</option>
            </Field>
          </div>

          {/* Dynamic rendering of participant fields */}
          {values.divisionType === "manualDivision" &&
            members.map((member, index) => (
              <div key={index} className="field-container">
                <label
                  htmlFor={`participants.${index}.amount`}
                  className="label"
                >
                  {member.name} Amount:
                </label>
                <Field
                  type="number"
                  id={`participants.${index}.amount`}
                  name={`participants.${index}.amount`}
                  value={participantAmounts[index].amount || ""}
                  placeholder="0"
                  onChange={(e) =>
                    handleParticipantChange(e, index, setFieldValue)
                  }
                  inputMode="numeric"
                  className="input"
                  step="0.01" // Allows decimal increments of 0.01
                />
              </div>
            ))}
          {values.divisionType === "manualDivision" ? 
          <div className="field-container">
            <label htmlFor="amountLeft" className="label">
              Amount Left:
            </label>
            <Field
              type="number"
              id="amountLeft"
              name="amountLeft"
              value={remainingAmount}
              disabled
              className="input-disable"
              step="0.01" // Allows decimal increments of 0.01
            />
          </div> : null
          }

          <button
            type="submit"
            disabled={
              values.divisionType === "manualDivision" && remainingAmount !== 0
            }
            className="button"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
