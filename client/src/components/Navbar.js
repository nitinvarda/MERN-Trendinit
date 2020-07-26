import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import {

    Link
} from "react-router-dom";
import './Navbar.css';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
            <Navbar.Brand  ><Link to="/"><img src="/images/trendinit_logo.png" className="title-img" alt="post img" /></Link></Navbar.Brand>
            <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none' }}><h4 className="title" id="trend">TREND</h4><h4 className="title" id="init">INIT</h4></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" data-toggle="collapse" />
            <Navbar.Collapse id="basic-navbar-nav" className="mr-auto justify-content-end" >

                <Nav className="nav-links" >

                    <Nav.Link  ><Link to="/admin-home" style={{ textDecoration: 'none' }}><h5>Admin</h5></Link></Nav.Link>
                    <Nav.Link  ><Link to="/contact" style={{ textDecoration: 'none' }}><h5>Contact Us</h5></Link></Nav.Link>


                </Nav>



            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar;