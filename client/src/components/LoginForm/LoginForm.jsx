import React from "react";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LoginForm = ({
  submission,
  initialValues,
  validationSchema,
  loaderStatus,
}) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
          <div className="form-container">
            <h2>Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submission}
            >
              {loaderStatus ? (
                <LoadingSpinner />
              ) : (
                <Form>
                  <BootstrapForm.Group controlId="email">
                    <BootstrapForm.Label>Email:</BootstrapForm.Label>
                    <Field
                      type="email"
                      as={BootstrapForm.Control}
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="password">
                    <BootstrapForm.Label>Password:</BootstrapForm.Label>
                    <Field
                      type="password"
                      as={BootstrapForm.Control}
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-button"
                  >
                    Login
                  </Button>

                  <div className="register-link text-center">
                    <span>Not a member yet? </span>
                    <Link to="/register">Register</Link>
                    <br></br>
                    <Link to="/">Back home</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginForm;
