import React from 'react';
import { useFormik } from 'formik';

const NewExpenseForm = ({ initialValues, handleSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit, // Call onSubmit function passed from parent with form values
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor='lastName'>Last Name</label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default NewExpenseForm;
