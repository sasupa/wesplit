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
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
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

    //Navigation Dummy
    navigate('/groups');

    resetForm();
    setSubmitting(false);
  };

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
                onSubmit={onSubmit}
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
