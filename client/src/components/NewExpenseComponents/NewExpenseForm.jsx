import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from 'react-bootstrap';
import * as Yup from 'yup';

const NewExpenseForm = ({ initialValues, handleSubmit, validationSchema }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={8}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <BootstrapForm.Group controlId='firstName'>
                <BootstrapForm.Label>First Name</BootstrapForm.Label>
                <Field type='text' name='firstName' className='form-control' />
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='text-danger'
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId='lastName'>
                <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                <Field type='text' name='lastName' className='form-control' />
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='text-danger'
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId='email'>
                <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                <Field type='email' name='email' className='form-control' />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-danger'
                />
              </BootstrapForm.Group>

              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default NewExpenseForm;
