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

const SignUpForm = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // Handle your sign-up logic here
    console.log('Form values submitted:', values);
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

              <Button variant='primary' type='submit'>
                Sign Up
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
