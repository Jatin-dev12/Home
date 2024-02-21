import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import pic from './speaking.png'

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src={pic} alt="dcadssd" className="ll" width="100" height="50px" />
            Speech to Text Converter
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-end">
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>            Speech to Text Converter
</Offcanvas.Title>
        </Offcanvas.Header>
          <Offcanvas.Body>
          
              <Nav.Link href="ai">Speech To Text</Nav.Link>
            <Nav.Link href="trancribe">Speech To Translate</Nav.Link>
            <Nav.Link href="tese">Text To Speech</Nav.Link>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;