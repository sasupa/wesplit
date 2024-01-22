import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { Context } from "../../Context";
import { logout } from '../../utils/apiUtils';
import "./Footer.css"

const Footer = () => {
  const navigate = useNavigate();
  const { contextValue, updateContextValue } = useContext(Context);
  const [darkModeIcon, setDarkModeIcon] = useState("fa fa-moon-o fa-2x");
  const [darkModeBg, setDarkModeBg] = useState("fixed-bottom light");

  const handleLogout = () => {
    logout()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Log out failed: ', error);
      });
  };

  const handleDarkMode = () => {
    if (!contextValue[0].darkMode) {
      document.body.classList.add("dark-mode");
      let newState = [...contextValue];
      newState[0].darkMode = true;
      setDarkModeIcon("fa fa-sun-o fa-2x");
      setDarkModeBg("fixed-bottom dark");
      updateContextValue(newState);
    } else {
      document.body.classList.remove("dark-mode");
      let newState = [...contextValue];
      newState[0].darkMode = false;
      setDarkModeIcon("fa fa-moon-o fa-2x");
      setDarkModeBg("fixed-bottom light");
      updateContextValue(newState);
    }
  };

  return (
    <Container fluid className={darkModeBg}>
      <Row>
        <Col className="text-center py-2">
          <Link to="/groups">
            <i className="fa fa-users fa-2x" aria-hidden="true"></i>
          </Link>
        </Col>
        <Col className="text-center py-2">
          <Link to="/settings">
            <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
          </Link>
        </Col>

        <Col className="text-center py-2">
          <i
            className={darkModeIcon}
            aria-hidden="true"
            onClick={handleDarkMode}
          ></i>
        </Col>
        <Col className="text-center py-2">
          <Link onClick={handleLogout} to="/">
            <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center py-2">
          <small>
            {contextValue[0].name} | Developer: {contextValue[0].developer} |{" "}
            {contextValue[0].year}{" "}
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
