import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css'
import pic from './speaking.png'
function Header () {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">
<img src={pic}
alt='dcadssd'
className='ll'
width="100"
height="50px"
/>Speech to Text Converter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end' >
          <Nav className="justify-content-end " >
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/chk">Speach</Nav.Link>
            <Nav.Link href="/text">Text</Nav.Link> */}

          


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;