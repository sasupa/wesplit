import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";

const NewExpenseForm = ({initialValues, handleSubmit, validationSchema, group,}) => {

  const [divisions, setDivisions] = useState([]);
  const [amount, setAmount] = useState(0);

  const handleDivisionChange = (values) => {
    return;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
  
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >{({values, handleChange}) => (

            <Form>
              <BootstrapForm.Group controlId="description">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="amount">
                <BootstrapForm.Label>Amount (€) </BootstrapForm.Label>
                <Field type="number" name="amount" className="form-control" />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-danger"
                  onChange={handleChange}
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="payer">
                <BootstrapForm.Label>Payer</BootstrapForm.Label>
                <Field
                  as="select"
                  type="text"
                  name="payer"
                  className="form-control"
                  onChange={handleChange}
                >
                  {group.members.map((member, index) => (
                    <option key={index} value={member.userId._id}>
                      {member.userId.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="payer"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="divisionType">
                <BootstrapForm.Label>Division type</BootstrapForm.Label>
                <Field
                  as="select"
                  type="text"
                  name="divisionType"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="split equally">Split equally</option>
                  <option value="manual division">Enter split manually</option>
                </Field>
                <ErrorMessage
                  name="divisionType"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              {values.divisionType == "manual division" &&
                group.members.map((member, index) => (
                  <>
                    <BootstrapForm.Group key={index}>
                      <BootstrapForm.Label htmlFor={member.userId._id}>
                        {member.userId.name}:
                      </BootstrapForm.Label>
                      <Field
                        type="number"
                        id={member.userId._id}
                        name={member.userId._id}
                        placeholder={Math.floor(values.amount / group.members.length)}
                        onChange={handleChange}
                      />
                    </BootstrapForm.Group>
                  </>
                ))}

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>)}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default NewExpenseForm;
