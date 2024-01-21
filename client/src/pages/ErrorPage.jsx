import { Link, useRouteError } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Container className="fixed-height-container">
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <div>
              <h3>Ohh! page not found</h3>
              <p>We can't seem to find the page you're looking for</p>
              <Link to="/">Back home</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div>
      <h3>Something went wrong</h3>
    </div>
  );
};

export default Error;
