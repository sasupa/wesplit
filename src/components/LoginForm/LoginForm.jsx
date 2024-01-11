import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'; // Import useHistory

const LoginForm = () => {
  const navigate = useNavigate(); //ini useNavigate

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // Simulate receiving a JWT token – replace with API call
    const fakeJwtToken = 'your_fake_jwt_token';

    // Save the token to local storage or context/state for future use
    localStorage.setItem('jwtToken', fakeJwtToken);

    // Redirect to a new page after successful login
    navigate('/groups'); // Change  to the desired route

    //TEST PURPOSES
    console.log({ fakeJwtToken, values });

    // Reset the form
    resetForm();
  };

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <BootstrapForm.Group controlId='email'>
                <BootstrapForm.Label>Email:</BootstrapForm.Label>
                <Field type='email' as={BootstrapForm.Control} name='email' />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-danger'
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId='password'>
                <BootstrapForm.Label>Password:</BootstrapForm.Label>
                <Field
                  type='password'
                  as={BootstrapForm.Control}
                  name='password'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-danger'
                />
              </BootstrapForm.Group>

              <Button variant='primary' type='submit'>
                Login
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
