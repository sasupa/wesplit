import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { register } from '../utils/apiUtils.js';

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const data = await register(values);
      console.log(data);
      toast.success('Registration successful');
      navigate('/'); // Redirect to login after successful registration
      resetForm();
      setSubmitting(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      resetForm();
      return error;
    }
  };

  return (
    <RegisterForm
      submission={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default RegisterPage;
