import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { Link, animateScroll as scroll } from 'react-scroll';
import Offeradslogo from "../../assets/Offerads-logo.webp";


const CollapsibleExample = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);

  const toggleNavbar = () => {
    setNavbarExpanded(!isNavbarExpanded);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-1 navbar text-dark"
      style={{
        backgroundColor: "#F0F3FF",
        borderBottom: "1px solid #2e6ca4",
        fontFamily: "Barlow Condensed, sans-serif",
        fontWeight: "600",
        fontStyle: "normal",
      }}
    >
      <Container>
        <Navbar.Brand>
          <img
            src={Offeradslogo}
            to="/"
            alt="Offerads Logo"
            className="img-fluid"
            style={{ width: "235px", height: "70px", objectFit: "none" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbar}
          style={{
            color: 'black',
            transition: 'color 0.3s ease',
          }}
        >
          {isNavbarExpanded ? (
            <FaArrowUpWideShort
              style={{
                color: '#2e6ca4',
                fontSize: '50px',
                cursor: 'pointer',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
            />
          ) : (
            <FaArrowDownWideShort
              style={{
                color: '#2e6ca4',
                fontSize: '50px',
                cursor: 'pointer',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
            />
          )}
        </Navbar.Toggle>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`nav-grps justify-content-around ${isNavbarExpanded ? 'show' : ''}`}
          style={{
            color: "#2e6ca4",
            borderColor: "grey",
            transition: 'max-height 0.3s ease, opacity 0.3s ease',
            maxHeight: isNavbarExpanded ? '1000px' : '0',
            opacity: isNavbarExpanded ? '1' : '0',
            overflow: 'hidden',
          }}
        >
          <Nav className="nav-links justify-content-around">
            <Link to="home" smooth={true} duration={500} className="home">
              Home
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="offers" smooth={true} duration={500} className="offers">
              Offers
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="about" smooth={true} duration={500} className="about">
              About
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <RouterLink to="/login" className="login">
              Login
            </RouterLink>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <RouterLink to="/register" className="register">
              Register
            </RouterLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CollapsibleExample;
