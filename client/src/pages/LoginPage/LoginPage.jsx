import React, { useEffect, useState, useContext } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../utils/apiUtils";
import { toast } from "react-toastify";
import { Context } from "../../Context.js";

const LoginPage = () => {
  //Inits
  const { contextValue, updateContextValue } = useContext(Context);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const initialValues = {
    password,
    email,
  };

  //Simple validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  //Submit handler – axios example at the bottom
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await login(values);
      console.log(data);

      // Tässä tuupataan kirjautunut käyttäjä Context APIin
      let newState = [...contextValue];
      newState[newState.length - 2] = data.user;
      console.log(newState);
      updateContextValue(newState);

      toast.success("Login successful");
      navigate("/groups");
      resetForm();
      setSubmitting(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      resetForm();
      return error;
    }
  };

  return (
    <LoginForm
      submission={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default LoginPage;
