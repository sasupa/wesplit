import React from 'react';
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

const RegisterForm = ({ submission, initialValues, validationSchema }) => {
  return (
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col xs={12} md={6}>
            <div className='form-container'>
              <h2>Register</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submission}
              >
                <Form>
                  <BootstrapForm.Group controlId='name'>
                    <BootstrapForm.Label>First Name:</BootstrapForm.Label>
                    <Field type='text' as={BootstrapForm.Control} name='name' />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-danger'
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId='lastName'>
                    <BootstrapForm.Label>Last Name:</BootstrapForm.Label>
                    <Field
                      type='text'
                      as={BootstrapForm.Control}
                      name='lastName'
                    />
                    <ErrorMessage
                      name='lastName'
                      component='div'
                      className='text-danger'
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId='email'>
                    <BootstrapForm.Label>Email:</BootstrapForm.Label>
                    <Field
                      type='text'
                      as={BootstrapForm.Control}
                      name='email'
                    />
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

                  <BootstrapForm.Group controlId='confirmPassword'>
                    <BootstrapForm.Label>Confirm Password:</BootstrapForm.Label>
                    <Field
                      type='password'
                      as={BootstrapForm.Control}
                      name='confirmPassword'
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='text-danger'
                    />
                  </BootstrapForm.Group>

                  <Button
                    variant='primary'
                    type='submit'
                    className='submit-button'
                  >
                    Register
                  </Button>

                  <div className='register-link text-center'>
                    <span>Already a member? </span>
                    <Link to='/login'>Login</Link>
                    <br></br>
                    <Link to="/">Back home</Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default RegisterForm;
