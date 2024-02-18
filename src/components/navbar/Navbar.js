import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../navbar/Navbar.css";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";


import Offeradslogo from "../../assets/Offerads-logo.webp";

function BasicExample() {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);
  const toggleNavbar = () => {
    setNavbarExpanded(!isNavbarExpanded);
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
            style={{ width: "200px", height: "70px", objectFit: "none" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={toggleNavbar}
        style={{
          color: 'black',
        }}
      >
        {isNavbarExpanded ? (
          <FaArrowUpWideShort
            style={{
              color: '#2e6ca4',
              fontSize: '50px',
              cursor: 'pointer',
            }}
          />
        ) : (
          <FaArrowDownWideShort
            style={{
              color: '#2e6ca4',
              fontSize: '50px',
              cursor: 'pointer',
            }}
          />
        )}
      </Navbar.Toggle>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="nav-grps justify-content-around"
          style={{ color: "#2e6ca4", borderColor: "grey" }}
        >
          <Nav className="nav-links justify-content-around">
            <Link to="/" className="home">
              Home
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/offers" className="offers">
              Offers
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/about" className="about">
              About
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/login" variant="outline-danger" className="login">
              Login
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/register" variant="danger" className="register">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

// import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import "../navbar/Navbar.css";
// import Offeradslogo from "../../assets/Offerads-logo.webp";
// // import NavDropdown from 'react-bootstrap/NavDropdown';

// function BasicExample() {
//   return (
//     <Navbar expand="lg" className="navbar-1 navbar  text-dark" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #2e6ca4" }}>
//       <Container>
//         {/* <Navbar.Brand className='nav-title'>Offerads</Navbar.Brand> */}
//         <img
//           src={Offeradslogo}
//           to="/"
//           alt="Offerads Logo"
//           className="img-fluid "
//           style={{ width: "180px" }}
//         />
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse
//           id="basic-navbar-nav"
//           className="nav-grps justify-content-around"
//           style={{ color: "#2e6ca4" }}
//         >
//           <Nav
//             className="nav-links justify-content-around"
//             style={{ color: "#2e6ca4" }}
//           >
//             <Link to="/" className="home">
//               Home
//             </Link>
//           </Nav>
//           <Nav
//             className="nav-links justify-content-around"
//             style={{ color: "#2e6ca4" }}
//           >
//             <Link to="/offers" className="offers">
//               Offers
//             </Link>
//           </Nav>
//           <Nav className="nav-links justify-content-around">
//             <Link to="/about" className="about">
//               About
//             </Link>
//           </Nav>
//         </Navbar.Collapse>
//         <Navbar.Collapse
//           id="basic-navbar-nav"
//           className="nav-grps justify-content-around"
//         >
//           <Nav className="nav-links justify-content-around">
//             <Link to="/login" variant="outline-danger" className="login">
//               Login
//             </Link>
//           </Nav>
//           <Nav className="nav-links justify-content-around">
//             <Link to="/register" variant="danger" className="register ">
//               Register
//             </Link>
//           </Nav>
//         </Navbar.Collapse>

//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;
