import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import "font-awesome/css/font-awesome.min.css";

const LandingPage = () => {
  return (
    <Container
      style={{
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          {/* Logo */}
          <Image
            src="https://sasupa.github.io/wesplit/logo512.png"
            alt="WeSplit Logo"
            style={{ maxWidth: "200px" }}
          />

          {/* Heading */}
          <h1 className="appName">WeSplit</h1>

          {/* Description Text */}
          <p>Split expenses with friends and family.</p>

          {/* Buttons */}

          <Link to="/login">
            <Button variant="primary" className="m-2">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="primary" className="m-2">
              Register
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center contribute">
        <Col md={6} className="text-center">
          <Button variant="info" className="m-2">
            <i className="fa fa-money" aria-hidden="true"></i>
            <span> Contribute</span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
