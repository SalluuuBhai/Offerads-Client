import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">404 Not Found</h1>
            <p className="text-center">
              The page you are looking for does not exist.
            </p>
            <Link to="/">Back to Home</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NoPage;



