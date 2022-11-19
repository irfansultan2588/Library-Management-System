import React, { useContext, useEffect, useState } from "react";
import LibraryManagement from "../LibrarryManagement/LibraryManagement";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './home.css'



const Home = () => {

   

    return (

       <>
     <LibraryManagement/>

     <Container className="containor2-main">
      <Row>
        <Col className="colsenter"> 
        <h2>Library Management System</h2>
        <p className="paragap">this is simple Library Management System Which use for maintain the Record of the library. this library
          Management System has been made by using react js , Mongoodb database, And Bootstrap 5 framework. This is react project online Library System.  
        </p>
        </Col>
      </Row>

    </Container>

    <Container fluid="md" id="main" >
      <Row>
        <Col className="col-admin"> 
          <h1>Admin Login</h1>
          <button className="btn-admin">Admin Login</button>
        
        </Col>
        <Col className="col-user"> 
          <h1>User Login</h1>
          <Button className="btn-user">User Login</Button>
          <Button variant="primary">User SignUp</Button>

        
        </Col>
      </Row>

    </Container>

       </>
    )
}

export default Home