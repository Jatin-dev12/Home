import React, {useState,useEffect} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import './Side.css'

const Side = () => {
	
    const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    useEffect(() => {
      setUrl(location.pathname);
    }, [location]);
  
 return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav defaultActiveKey="/sst" className={"" + (url === "/sst" ?" active" : "")} >
      <Nav.Link href="sst" className={"" + (url === "/sst" ?" active" : "")}>Speech To Translation</Nav.Link>
      <Nav.Link href="test" className={"" + (url === "/test" ?" active" : "")}>Speech To Text </Nav.Link>
      <Nav.Link href="tese" className={"" + (url === "/tese" ?" active" : "")}>Text To Speech</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
 );
};

export default Side;