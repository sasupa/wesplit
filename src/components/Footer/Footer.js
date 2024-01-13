import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom"; // Import useHistory

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    console.log("Logged out");
  };

  return (
    <Container fluid className="bg-light fixed-bottom">
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
          <Link onClick={handleLogout} to="/">
            <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;