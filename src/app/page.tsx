import React from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap is imported
import { Button } from "@mui/material";

function Example() {
  return (
    <Container>
      <Row className="roof">
        <Col className="text-center p-3 border">
          <span>roof+functions come here</span>
          <div>
            <Button variant="contained">Get your chores done</Button>
            </div>
        </Col>
      </Row>
      <Row className="base">
        <Col sm={4} className="text-center p-5 border">
          <span>One of three columns</span>
        </Col >
        <Col sm={4} className="text-center p-5 border">
          <span>One of three columns</span>
        </Col>
        <Col sm={4} className="text-center p-5 border">
          <span>One of three columns</span>
        </Col>
      </Row>
    </Container>
  );
}

export default Example;


