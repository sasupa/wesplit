import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import NewExpenseForm from '../components/NewExpenseComponents/NewExpenseForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    try {
      // Handle form submission here
      console.log('Form values:', values);
      toast.success('Expense added ✅ ');
      resetForm();
      handleClose();
      navigate('/groups');
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add new expense
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewExpenseForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestPage;
