import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom"; // Import useHistory

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("There's a token");
      navigate("/groups"); // Change  to the desired route
    }
  });

  return <LoginForm />;
};

export default LoginPage;
