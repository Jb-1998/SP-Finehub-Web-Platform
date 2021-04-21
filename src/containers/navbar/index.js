import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { VscHome,VscExtensions } from "react-icons/vsc";
import finelogo from '../../assets/images/nameapp.png'
import "./style.css"
import { NavbarBrand, Nav} from 'react-bootstrap';
import {auth} from "../../firebase";
import { ImSmile, ImSmile2, ImClock } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { IconContext } from "react-icons";

const NavigationBar = () => {
    return (
      <Navbar className="nav-style" sticky="top">
        <Navbar.Collapse className="justify-content-start">
          <Navbar.Brand href="#home" className="title-style">finehub</Navbar.Brand>
          <ul className="nav-menu">
                <li className="nav-item">
                    <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Profile</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Settings & Privacy</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Help & Support</a>
                </li>
            </ul>
            <div className="hamburger">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </Navbar.Collapse>
        {/* <Navbar.Collapse className="justify-content-center">
          <Nav>
            <Nav.Link href="#deets">
                <div>
                    <VscHome className="icon-style" />
                </div>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
                <div>
                    <VscExtensions className="icon-style-categories" />
                </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
        <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-secondary" onClick={() => {auth.signOut()}} style={{fontSize: 12, alignItems: 'center'}}><IconContext.Provider value={{ size: "1.5em"}}><FiLogOut/>  </IconContext.Provider>Sign Out</Button>
        </Navbar.Collapse>
        <Navbar.Toggle />
        {/* <Navbar.Collapse className="justify-content-end">
            <Button variant="primary">Sign Up</Button>
        </Navbar.Collapse> */}
      </Navbar>
    )
 }

 export default NavigationBar;

 const hamburger = document.querySelector(".hamburger");
 const navMenu = document.querySelector(".nav-menu");

 if(hamburger){
   hamburger.addEventListener("click", mobileMenu, true);
 }

 function mobileMenu() {
       hamburger.classList.toggle("active");
       navMenu.classList.toggle("active");
   }
