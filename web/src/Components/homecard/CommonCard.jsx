import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../AdminDashbord/adminDashboard.css";

const CommonCard = () => {
  return (
    <div>
      <Container className="box-container">
        <h2>Dashboard</h2>
        <Row xl={12} className="roww">
          <Col className="col2">
            <h2>3</h2>
            <p>Total Book Issue</p>
          </Col>
          <Col className="col2">
            <h2>3</h2>
            <p>Total Book Returned</p>
          </Col>
          <Col className="col2">
            <h2>0</h2>
            <p>Total Book Not Returned</p>
          </Col>
          <Col className="col2">
            <h2>3</h2>
            <p>Total Fines Received</p>
          </Col>
        </Row>

        <Row xl={12} className="">
          <Col className="col2">
            <h2>15</h2>
            <p>Total Book</p>
          </Col>
          <Col className="col2">
            <h2>15</h2>
            <p>Total Author</p>
          </Col>
          <Col className="col2">
            <h2>1</h2>
            <p>Total Category</p>
          </Col>
          <Col className="col2">
            <h2>10</h2>
            <p>Total Location Rack</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CommonCard;
