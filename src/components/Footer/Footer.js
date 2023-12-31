// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <Container fluid className="bg-light fixed-bottom">
      <Row>
        <Col className="text-center py-2">
          <Link to="/groups">
            <i className="fa fa-users" aria-hidden="true"></i>
          </Link>
        </Col>
        <Col className="text-center py-2">
          <Link to="/settings">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </Link>
        </Col>
        <Col className="text-center py-2">
          <Link to="/">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
