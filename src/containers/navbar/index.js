import React, { useState, useEffect, useRef } from 'react';
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

import { ReactComponent as BellIcon } from '../../assets/icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../assets/icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../assets/icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as CogIcon } from '../../assets/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../assets/icons/bolt.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

import { CSSTransition } from 'react-transition-group';

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 60)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight + 60;
    setMenuHeight(height);
  }

  function DropdownItemComponent(props) {
    return (
      <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  function Logout(props) {

    const logoutHandler = () => {
      props.logout()
    }

    return (
      <a href="#" className="menu-item" onClick={logoutHandler}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown-style" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <p style={{paddingTop: 10, paddingLeft: 10}}>My Profile</p>
          <DropdownItemComponent
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
              Settings
          </DropdownItemComponent>
          <a href="#" className="menu-item" onClick={() => auth.signOut()}>
          <span className="icon-button"><LogoutIcon/></span>
          Logout
          </a>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItemComponent goToMenu="main" leftIcon={<ArrowIcon />}>
            Settings
          </DropdownItemComponent>
          <DropdownItemComponent leftIcon={<BoltIcon />}>Accounts</DropdownItemComponent>
          <DropdownItemComponent leftIcon={<BoltIcon />}>Security and Privacy</DropdownItemComponent>
        </div>
      </CSSTransition>

    </div>
  );
}
const NavigationBar = () => {
    return (
      <Navbar className="nav-style" sticky="top">
        <Navbar.Collapse className="justify-content-start">
          <Navbar.Brand href="home" className="title-style">finehub</Navbar.Brand>
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
            <NavItem icon={<PlusIcon />} >
            <DropdownMenu></DropdownMenu>

            </NavItem>
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<MessengerIcon />} />
            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
        </Navbar.Collapse>
        <Navbar.Toggle />
        {/* <Navbar.Collapse className="justify-content-end">
            <Button variant="primary">Sign Up</Button>
        </Navbar.Collapse> */}
      </Navbar>
    )
 }

 export default NavigationBar;