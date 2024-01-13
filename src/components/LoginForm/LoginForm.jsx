import React from 'react';
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './LoginForm.css';
import { Link } from 'react-router-dom';

const LoginForm = ({ submission, initialValues, validationSchema }) => {
  return (
    <div className='full-height-center'>
      <Container className='fixed-height-container'>
        <Row className='justify-content-md-center mt-5'>
          <Col xs={12} md={6}>
            <div className='form-container'>
              <h2>Login</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submission}
              >
                <Form>
                  <BootstrapForm.Group controlId='email'>
                    <BootstrapForm.Label>Email:</BootstrapForm.Label>
                    <Field
                      type='email'
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

                  <Button
                    variant='primary'
                    type='submit'
                    className='submit-button'
                  >
                    Login
                  </Button>

                  <div className='register-link text-center'>
                    <span>Not a member yet? </span>
                    <Link to='/register'>Register</Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default LoginForm;
