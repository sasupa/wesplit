import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { testAPI } from "../../utils/apiUtils";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const handleTest = () => {
    testAPI()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed: ", error);
      });
  };

  return (
    <Container
      style={{
        backgroundColor: "#f8f9fa",
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
          <h1>WeSplit</h1>

          {/* Description Text */}
          <p>Split expenses with friends and family.</p>

          {/* Buttons */}
          <div>
            <Link to="/login">
              <Button variant="primary" className="m-2">
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button variant="secondary" className="m-2">
                Sign Up
              </Button>
            </Link>

            <Button variant="secondary" className="m-2" onClick={handleTest}>
              TEST API
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
