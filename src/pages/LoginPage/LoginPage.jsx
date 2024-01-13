import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom'; // Import useHistory

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  //Inits
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const initialValues = {
    password,
    email,
  };

  //Simple validation
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
  });

  //Submit handler – axios example at the bottom
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    //Token acceptance dummy
    const token = 'jwt_token_dummy';

    //Storing token
    localStorage.setItem('jwt_token', token);

    //TEST
    console.log({ user: values, token: token });
    console.log(email, initialValues);

    //Navigation Dummy
    navigate('/groups');

    resetForm();
    setSubmitting(false);
  };

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   if (token) {
  //     console.log("There's a token");
  //     navigate("/groups"); // Change  to the desired route
  //   }
  // });

  return (
    <LoginForm
      submission={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default LoginPage;

/* DUMMY CALL FOR RREFERNCE *****


const onSubmit = async (values, { setSubmitting }) => {
  try {
    // Dummy API call
    const response = await axios.post('https://api.example.com/login', values);

    // Assuming the API returns a token
    const { token } = response.data;

    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Your form submission logic goes here

    console.log('API Response:', response.data);
  } catch (error) {
    // Handle API call error
    console.error(
      'API Error:',
      error.response ? error.response.data : error.message
    );
  } finally {
    setSubmitting(false);
  }
};





*/
